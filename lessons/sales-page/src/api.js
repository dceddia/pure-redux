const PREFIX = '/api';

let authToken = null;
export const setToken = token => {
  authToken = token;
};

export const purchase = courseId => {
  return postData(PREFIX + '/buy', {
    courseId
  });
};
export const createCourse = (name, price) => {
  return postData(PREFIX + '/courses', {
    name,
    price: parseFloat(price)
  });
};

export const getCourses = () => {
  return fetch(PREFIX + '/courses')
    .then(handleErrors)
    .then(res => res.json());
};

export const getLessons = courseId => {
  return fetch(PREFIX + '/lessons?courseId=' + courseId, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(handleErrors)
    .then(res => res.json());
};

export const createLesson = (name, courseId) => {
  return postData(PREFIX + '/lessons', {
    name,
    courseId
  });
};

export const updateLesson = lesson => {
  return putData(PREFIX + `/lessons/${lesson.id}`, lesson);
};

export const destroyLesson = lesson => {
  return deleteData(PREFIX + `/lessons/${lesson.id}`);
};

export const loginUser = (username, password) => {
  return postData(PREFIX + '/login', {
    username,
    password
  });
};

export const createUser = (username, password) => {
  return postData(PREFIX + '/users', {
    username,
    password
  });
};

function postData(url = ``, data = {}) {
  return fetchWithData(url, data, 'POST');
}
function putData(url = ``, data = {}) {
  return fetchWithData(url, data, 'PUT');
}
function deleteData(url = ``, data = {}) {
  return fetchWithData(url, data, 'DELETE');
}

function fetchWithData(
  url = ``,
  data = {},
  method = 'POST'
) {
  // Default options are marked with *
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken
        ? `Bearer ${authToken}`
        : undefined
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
    .then(handleErrors)
    .then(response => response.json());
}

function handleErrors(response) {
  if (!response.ok) {
    return response.json().then(body => {
      throw new Error(body.message);
    });
  } else {
    return response;
  }
}
