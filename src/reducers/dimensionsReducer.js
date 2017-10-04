import { CHANGE_DIMENSION, ADD_DIMENSION, REMOVE_DIMENSION } from '../actions';

function reducer(state = [], action) {
  let length = state.length;

  switch (action.type) {
    case CHANGE_DIMENSION:

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

    case ADD_DIMENSION:
      let newId = state[state.length - 1].id + 1;
      let newItem = {
        id: newId,
        "value": 100
      }

      return state.concat(newItem).map((item, index) => {
        let coords = calcPoint(item.value, index, length + 1);

        if (!item.basePoint) {
          return Object.assign({}, item, {
            x: coords.x,
            y: coords.y,
            basePoint: {
              x: coords.x,
              y: coords.y
            }
          });
        }

        return Object.assign({}, item, {
          x: coords.x,
          y: coords.y
        });
      });

    case REMOVE_DIMENSION:
      if (length <= 4) { return state }

      return state.slice(0, -1).map((item, index) => {
        let coords = calcPoint(item.value, index, length - 1);

        return Object.assign({}, item, {
          x: coords.x,
          y: coords.y,
          basePoint: {
            x: coords.x,
            y: coords.y
          }
        });
      });

    default:
      return state;
  }
}

function updateCoordinate(item, index) {
  let coords = calcPoint(item.value, index, length + 1);

  return Object.assign({}, item, {
    x: coords.x,
    y: coords.y
  });
}

function calcPoint(radius, index, length) {
  let angle = 2 * Math.PI / length * index - Math.PI / 2;
  let x = Math.ceil(Math.cos(angle) * radius + 150);
  let y = Math.ceil(Math.sin(angle) * radius + 150);

  return { x, y };
}

export default reducer;
