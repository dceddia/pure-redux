import {
  selectHouse,
  addPoints,
  resetScores
} from './actions';

test('resetScores', () => {
  const result = resetScores();
  expect(result.type).toEqual('RESET_SCORES');
});

test('addPoints', () => {
  const house = { id: 7 };
  const result = addPoints(house, 50);
  expect(result.type).toEqual('ADD_POINTS');
  expect(result.house).toBe(house);
  expect(result.points).toEqual(50);
  expect(result).toMatchSnapshot();
});

test('selectHouse', () => {
  const house = {};
  const result = selectHouse(house);
  expect(result.type).toEqual('SELECT_HOUSE');
  expect(result.house).toBe(house);
});
