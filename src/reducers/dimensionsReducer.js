import { CHANGE_DIMENSION } from '../actions';

function reducer(state = [], action) {
  switch (action.type) {
    case CHANGE_DIMENSION:
      let length = state.length;

      return state.map((item, index) => {
        if (item.id === action.id) {
          let coords = calcPoint(action.value, index, length);

          return Object.assign({}, item, {
            value: action.value,
            x: coords.x,
            y: coords.y
          });
        }

        return item;
      });
    default:
      return state;
  }
}

function calcPoint(radius, index, length) {
  let angle = 2 * Math.PI / length * index - Math.PI / 2;
  let x = Math.ceil(Math.cos(angle) * radius + 150);
  let y = Math.ceil(Math.sin(angle) * radius + 150);

  return { x, y };
}

export default reducer;
