import { connect } from 'react-redux';

import { changeDimension } from '../actions';
import Polygon from '../components/Polygon';

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

const PolygonContainer = connect(mapStateToProps, mapDispatchToProps)(Polygon);

export default PolygonContainer;
