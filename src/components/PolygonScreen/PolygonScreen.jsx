import React from 'react';

import DimensionInputsContainer from '../../containers/DimensionInputsContainer';
import PolygonDot from './PolygonDot';

class PolygonScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const WIDTH = 300;
    const HEIGHT = 300;
    const FILL_FIGURE = '#3F51B5';
    const FILL_DOT = '#a0cb72';
    const CLASS_NAME_CONTAINER = "polygon-block";
    const CLASS_NAME_FIGURE = "polygon-block__figure";
    const CLASS_NAME_DOT = "polygon-block__dot";

    let points = this.props.dimensions.map(item => '' + item.x + ',' + item.y).join(',');

    return (
      <article className={ CLASS_NAME_CONTAINER }>
        <svg width={ WIDTH } height={ HEIGHT } className={ CLASS_NAME_FIGURE }>
          <g id="polygonGroup">
            <polygon points={ points } fill={ FILL_FIGURE }></polygon>
            { this.props.dimensions.map(item =>
              <PolygonDot
                cx={ item.x }
                cy={ item.y }
                id={ item.id }
                key={ item.id }
                className={ CLASS_NAME_DOT }
                fill={ FILL_DOT }
                onPointDrag={ this.props.onPointDrag }
                basePoint={ item.basePoint }
                currentValue={ item.value }
              />
            )}
          </g>
        </svg>
        <DimensionInputsContainer />
      </article>
    )
  }
}

export default PolygonScreen;
