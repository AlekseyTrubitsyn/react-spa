import { connect } from 'react-redux';

import { changeDimension } from '../actions';
import PolygonScreen from '../components/PolygonScreen';

function mapStateToProps(state) {
  return {
    dimensions: state.dimensions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: (id, value) => { dispatch(changeDimension(id, value)); }
  }
}

const PolygonScreenContainer = connect(mapStateToProps, mapDispatchToProps)(PolygonScreen);

export default PolygonScreenContainer;
