import { combineReducers } from 'redux';

import screens from './screensReducer';
import dimensions from './dimensionsReducer';

const reducer = combineReducers({
  screens,
  dimensions
});

export default reducer;
