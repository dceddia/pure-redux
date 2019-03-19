const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const jwt = require('jsonwebtoken');

const SECRET_KEY = '12345_not_very_secret';
const EXPIRES_IN = '24h';

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: EXPIRES_IN
  });
}

function findUser(username) {
  return router.db
    .get('users')
    .find({ username })
    .value();
}

function addCourseToUser(courseId, username) {
  return router.db
    .get('users')
    .find({ username })
    .update('courses', courses => {
      if (courses && courses.indexOf(courseId) === -1) {
        return [...courses, courseId];
      }
      return courses;
    })
    .write();
}

function isAuthenticated(username, password) {
  return !!router.db
    .get('users')
    .find({ username, password })
    .value();
}

function createAuthorizedUser(username) {
  const user = findUser(username);
  const exposedUserFields = {
    ...user,
    password: undefined
  };

  const token = createToken(exposedUserFields);

  return {
    ...exposedUserFields,
    token
  };
}

function authorize(req, res) {
  const [scheme, token] = (
    req.headers.authorization || ''
  ).split(' ');

  if (scheme !== 'Bearer') {
    res
      .status(400)
      .json({ message: 'Bad authorization header' });
    return false;
  }

  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (e) {
    res
      .status(401)
      .json({ message: 'access_token is invalid' });
    return false;
  }
}

server.use(middlewares);
server.use(jsonServer.bodyParser);

// When user signs up, authenticate them immediately by
// adding a token to the response
router.render = (req, res) => {
  if (
    req.method === 'POST' &&
    req.path.endsWith('/users') &&
    res.locals.data &&
    res.locals.data.username
  ) {
    res.jsonp(
      createAuthorizedUser(res.locals.data.username)
    );
  } else {
    // Normal response
    res.jsonp(res.locals.data);
  }
};

server.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (isAuthenticated(username, password)) {
    res.status(200).json(createAuthorizedUser(username));
  } else {
    return res
      .status(401)
      .json({ message: 'Bad username or password' });
  }
});

server.use((req, res, next) => {
  // Skip authorization for creating new users (POST /users)
  if (
    req.method === 'POST' &&
    req.path.endsWith('/users')
  ) {
    // Require username and password
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        message: 'Missing username or password'
      });
    }

    // Disallow duplicate usernames
    if (findUser(req.body.username)) {
      return res
        .status(409)
        .json({ message: 'Username exists' });
    }
    // Make sure the new user can't be "admin"!
    // Also: initialize the courses they own.
    req.body.role = 'user';
    req.body.courses = [];
    return next();
  }

  // allow anyone to GET /courses
  if (req.method === 'GET' && req.path.match(`/courses$`)) {
    return next();
  }

  const decodedPayload = authorize(req, res);
  if (!decodedPayload) {
    return;
  }

  // Save the currentUser to the request
  req.currentUser = decodedPayload;

  const deny = () =>
    res.status(403).json({ message: 'Access denied' });

  switch (decodedPayload.role) {
    // admin can do anything
    case 'admin':
      return next();
    case 'user':
      // allow GET /users/:theirId
      if (
        req.method === 'GET' &&
        req.path.match(`/users/${decodedPayload.userId}$`)
      ) {
        return next();
      }

      // allow GET /lessons?courseId=X if they own the course
      const user = findUser(decodedPayload.username);
      if (
        req.method === 'GET' &&
        req.path.match(`/lessons`) &&
        user.courses &&
        user.courses.includes(parseInt(req.query.courseId))
      ) {
        return next();
      }

      // allow GET /courses/:courseId/lessons if they own the course
      const match = req.path.match(
        /\/courses\/(\d+)\/lessons$/
      );
      if (
        req.method === 'GET' &&
        match &&
        user.courses.includes(parseInt(match[1]))
      ) {
        return next();
      }

      // allow POST /buy if they don't already own the course
      if (
        req.method === 'POST' &&
        req.path.endsWith('/buy') &&
        !user.courses.includes(parseInt(req.body.courseId))
      ) {
        return next();
      }

      return deny();
    // unknown role
    default:
      return deny();
  }
});

server.post('/api/buy', (req, res) => {
  // Authenticated users can buy courses for themselves
  addCourseToUser(
    parseInt(req.body.courseId),
    req.currentUser.username
  );

  res
    .status(200)
    .json(createAuthorizedUser(req.currentUser.username));
});

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1'
  })
);
server.use(router);
server.listen(process.env.port || 8080, () => {
  console.log('JSON Server is running');
});
