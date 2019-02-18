export function doMultipleThings() {
  return dispatch => {
    dispatch({ type: 'FIRST' });
    dispatch({ type: 'SECOND' });
    dispatch({ type: 'THIRD' });
  };
}

export function callMeMaybe() {
  return (dispatch, getState) => {
    if (getState().maybe === true) {
      dispatch({ type: 'PLACE_CALL', who: 'me' });
    }
  };
}

export function getPosts() {
  return dispatch => {
    dispatch({ type: 'GET_POSTS_BEGIN' });
    return fetch('https://www.reddit.com/r/reactjs.json')
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: 'GET_POSTS_SUCCESS',
          posts: json.data.children.map(c => c.data)
        });
      })
      .catch(error => {
        dispatch({ type: 'GET_POSTS_ERROR', error });
      });
  };
}
