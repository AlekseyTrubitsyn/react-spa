import { CHANGE_DIMENSION } from '../actions';

function reducer(state = [], action) {
  switch (action.type) {
    case CHANGE_DIMENSION:
      return state.map(item => {
        if (item.id === action.id) {
          return Object.assign({}, item, { value: action.value });
        }

        return item;
      });
    default:
      return state;
  }
}

export default reducer;
