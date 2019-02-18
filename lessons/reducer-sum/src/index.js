let a = [ 1, 2, 3, 4, 5 ]

let sum = a.reduce(function(total, item)  {
  return total + item;
}, 0)

let actions = [
  { type: "ADD", value: 1 },
  { type: "ADD", value: 2 },
  { type: "ADD", value: 3 },
  { type: "ADD", value: 4 },
  { type: "ADD", value: 5 },
]
function reducer(state, action) {
  console.log(state, action)
  switch(action.type) {
    case "ADD":
      return state + action.value;
    default:
      return state;
  }
}
let finalState = actions.reduce(reducer, 0)
console.log(finalState)