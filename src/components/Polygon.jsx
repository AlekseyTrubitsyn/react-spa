import React from 'react';

import DimensionInputsContainer from '../containers/DimensionInputsContainer';

class Polygon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dimensions: props.dimensions
    }
    this.handleRangeModifying = this.handleRangeModifying.bind(this);
  }

  render() {
    let dimensions = this.state.dimensions;
    let verticesCount = dimensions.length;
    let rangeInputsClassName = (verticesCount > 10) ? 'polygon-block__form--blocked' : '';

    let cuttedStats = dimensions.slice(0, 10);

    return (
      <article className="polygon-block">
        <svg width="300" height="300" className="polygon-block__figure">
          <g>
            <polygon points="150,70,220,110,220,190,150,230,81,190,81,110" fill="#3F51B5"></polygon>
          </g>
        </svg>
        <DimensionInputsContainer />
      </article>
    )
  }
}

export default Polygon;
