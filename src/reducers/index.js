import { CHANGE_SCREEN } from '../actions'

function reducer(state = [], action) {
  switch (action.type) {
    case CHANGE_SCREEN:
      return state.map(item => {
        if (item.id == action.id) {
          return Object.assign({}, item, { active: true });
        }
        return Object.assign({}, item, { active: false });
      });

    default:
      return state;
  }
}

export default reducer;
