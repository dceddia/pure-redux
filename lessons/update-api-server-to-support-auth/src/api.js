const PREFIX = '/api';

export const createCourse = (name, price) => {
  return postData(PREFIX + '/courses', {
    name,
    price: parseFloat(price)
  });
};

export const getCourses = () => {
  return fetch(PREFIX + '/courses').then(res => res.json());
};

export const getLessons = courseId => {
  return fetch(
    PREFIX + '/lessons?courseId=' + courseId
  ).then(res => res.json());
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
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }).then(response => response.json());
}
