import React from 'react';

import DimensionInputsContainer from '../containers/DimensionInputsContainer';

class PolygonScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const width = 300;
    const height = 300;
    const fill = '#3F51B5';

    let points = this.props.dimensions.map(item => '' + item.x + ',' + item.y).join(',');

    return (
      <article className="polygon-block">
        <svg width="300" height="300" className="polygon-block__figure">
          <g>
            <polygon points={ points } fill={fill}></polygon>
          </g>
        </svg>
        <DimensionInputsContainer />
      </article>
    )
  }
}

export default PolygonScreen;
