import React from 'react';

class DimensionInput extends React.Component {
  constructor(props) {
    super(props);

    let refName = 'dimensInput' + this.props.id;
    let v = props.value;

    this.state = {
      value: v,
      refName: refName
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    let v = this.refs.dimensInput.value;

    this.setState({ value: v });
    this.props.onChange(this.props.id, v);
  }

  render() {
    return (
      <input
        type="range"
        ref="dimensInput"
        key={ this.props.id }
        id={ this.props.id }
        value={ this.state.value }
        onChange={ this.handleChange }
      />
    )
  }
}

export default DimensionInput;
