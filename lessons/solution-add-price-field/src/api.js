export const createCourse = (name, price) => {
  return postData('/courses', {
    name,
    price: parseFloat(price)
  });
};

export const getCourses = () => {
  return fetch('/courses').then(res => res.json());
};

function postData(url = ``, data = {}) {
  // Default options are marked with *
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }).then(response => response.json());
}
