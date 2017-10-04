import { connect } from 'react-redux';

import {changeDimension, addDimension, removeDimension } from '../actions';
import DimensionInputs from '../components/PolygonScreen/DimensionInputs';

function mapStateToProps(state) {
  return {
    dimensions: state.dimensions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: (id, value) => { dispatch(changeDimension(id, value)); },
    addDimension: () => { dispatch(addDimension()) },
    removeDimension: () => { dispatch(removeDimension()) }
  }
}

const DimensionInputsContainer = connect(mapStateToProps, mapDispatchToProps)(DimensionInputs);

export default DimensionInputsContainer;
