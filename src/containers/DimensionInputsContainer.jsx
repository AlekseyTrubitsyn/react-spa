import { connect } from 'react-redux';

import {changeDimension } from '../actions';
import DimensionInputs from '../components/DimensionInputs';

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

const DimensionInputsContainer = connect(mapStateToProps, mapDispatchToProps)(DimensionInputs);

export default DimensionInputsContainer;
