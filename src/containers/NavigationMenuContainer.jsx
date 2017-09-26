import { connect } from 'react-redux';

import { changeScreen } from '../actions';
import NavigationMenu from '../components/NavigationMenu';

function mapStateToProps(state) {
  return {
    screens: state.screens
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: id => { dispatch(changeScreen(id)) }
  }
}

const NavigationMenuContainer = connect(mapStateToProps, mapDispatchToProps)(NavigationMenu);

export default NavigationMenuContainer;
