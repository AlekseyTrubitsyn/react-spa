import { connect } from 'react-redux';

import Screens from '../components/Screens';

function mapStateToProps(state) {
  return {
    screens: state.screens
  }
}

const ScreensContainer = connect(mapStateToProps)(Screens);

export default ScreensContainer;
