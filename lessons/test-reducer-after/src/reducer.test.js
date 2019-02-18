import reducer from './reducer';
import flags from './flags';

const slytherin = {
  id: 3,
  name: 'Slytherin',
  image: flags.slytherin,
  points: 0
};

test('ADD_HOUSE_BEFORE inserts house at the front', () => {
  // given
  const state = reducer(undefined, { type: 'INIT' });
  // when
  const newState = reducer(state, {
    type: 'ADD_HOUSE_BEFORE',
    house: slytherin
  });
  // then
  expect(newState.length).toBe(4);
  expect(newState[0]).toBe(slytherin);
});

test('initial state has 3 houses', () => {
  const state = reducer(undefined, {});
  expect(state.length).toBe(3);
});

test('REMOVE_HOUSE_BY_NAME', () => {
  const state = reducer(undefined, {});
  const newState = reducer(state, {
    type: 'REMOVE_HOUSE_BY_NAME',
    name: 'Gryffindor'
  });
  expect(newState.length).toBe(2);
  expect(
    newState.find(i => i.name === 'Gryffindor')
  ).toBeUndefined();
});
