import {
  doMultipleThings,
  callMeMaybe,
  getPosts
} from './actions';

function mockFetch(data) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  );
}

test('doMultipleThings calls 3 actions', () => {
  const mockDispatch = jest.fn();
  doMultipleThings()(mockDispatch);
  expect(mockDispatch.mock.calls.length).toBe(3);
  expect(mockDispatch.mock.calls[0][0]).toEqual({
    type: 'FIRST'
  });
  expect(mockDispatch.mock.calls[1][0]).toEqual({
    type: 'SECOND'
  });
  expect(mockDispatch.mock.calls[2][0]).toEqual({
    type: 'THIRD'
  });
});

describe('callMeMaybe', () => {
  let dispatch, getState;
  beforeEach(() => {
    dispatch = jest.fn();
    getState = jest.fn();
  });

  it('calls when maybe is true', () => {
    getState.mockReturnValue({
      maybe: true
    });
    callMeMaybe()(dispatch, getState);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'PLACE_CALL',
      who: 'me'
    });
  });

  it('does not call when maybe is false', () => {
    getState.mockReturnValue({
      maybe: false
    });
    callMeMaybe()(dispatch, getState);
    expect(dispatch.mock.calls.length).toBe(0);
  });
});

describe('getPosts', () => {
  it('fetches posts', async () => {
    global.fetch = mockFetch({
      data: {
        children: [{ data: { id: 1 } }, { data: { id: 2 } }]
      }
    });
    const dispatch = jest.fn();
    await getPosts()(dispatch);
    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'GET_POSTS_BEGIN'
    });
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: 'GET_POSTS_SUCCESS',
      posts: [{ id: 1 }, { id: 2 }]
    });
  });

  it('handles errors', async () => {
    const error = { message: 'oh no' };
    global.fetch = () => Promise.reject(error);
    const dispatch = jest.fn();
    await getPosts()(dispatch);
    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'GET_POSTS_BEGIN'
    });
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: 'GET_POSTS_ERROR',
      error
    });
  });
});
