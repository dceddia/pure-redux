export function selectHouse(house) {
  return {
    type: 'SELECT_HOUSE',
    house
  };
}

export function addPoints(house, points) {
  return {
    type: 'ADD_POINTS',
    house,
    points
  };
}

export function resetScores() {
  return {
    type: 'RESET_SCORES'
  };
}
