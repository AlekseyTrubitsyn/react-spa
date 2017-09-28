import { connect } from 'react-redux';

import { changeDimension } from '../actions';
import PolygonScreen from '../components/PolygonScreen';

// let basePoints;
// let basePointsSet = false;

function mapStateToProps(state) {
  // if (!basePointsSet) {
  //   basePoints = state.slice(0);
  //   basePointsSet = true;
  // }

  return {
    dimensions: state.dimensions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: (id, value) => { dispatch(changeDimension(id, value)); },
    onPointDrag: (id, event) => { handlePointDrag(event, id, dispatch); }
  }
}

const PolygonScreenContainer = connect(mapStateToProps, mapDispatchToProps)(PolygonScreen);

export default PolygonScreenContainer;

//TODO fix non-first-drag bugs
function handlePointDrag(eStart, id, dispatch) {
  const center = { x: 100, y: 100 };
  const MAX_RANGE = 100;

  let target = eStart.currentTarget;
  target.ondragstart = () => false;

  let g = target.parentNode;
  let gBCR = g.getBoundingClientRect();

  let svg = g.parentNode;
  svg.style.cursor = 'pointer';

  let centerPoint = {
    x: gBCR.left + center.x,
    y: gBCR.top + center.y
  };

  let startPoint = {
    x: eStart.clientX,
    y: eStart.clientY
  };

  // let basePoint = {
  //   x:
  // }

  let dxStartToCenter = getRange(startPoint, centerPoint);

  function mouseMove(eMoving) {
    let movingPoint = { x: eMoving.clientX, y: eMoving.clientY };
    let projectionPoint = getProjectedPoint(movingPoint);

    let dxProjectionToCenter = getRange(projectionPoint, centerPoint);
    let dxProjectionToStart = getRange(projectionPoint, startPoint);

    if ((dxProjectionToCenter <= MAX_RANGE) && (dxProjectionToStart <= MAX_RANGE)) {
      console.log(dxProjectionToCenter, dxProjectionToStart, dxStartToCenter);
      // console.log(changeDimension, id, dxProjectionToCenter)
      dispatch(changeDimension(id, dxProjectionToCenter));
    }
  }

  function getRange(first, second) {
    let dx = Math.abs(first.x - second.x);
    let dy = Math.abs(first.y - second.y);

    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }

  function getProjectedPoint(movingPoint) {
    let x1 = startPoint.x;
    let y1 = startPoint.y;
    let x2 = centerPoint.x;
    let y2 = centerPoint.y;
    let x3 = movingPoint.x;
    let y3 = movingPoint.y;

    let k = ((y2-y1) * (x3-x1) - (x2-x1) * (y3-y1)) / ((y2-y1)**2 + (x2-x1)**2);
    return {
      x: (x3 - k * (y2-y1)),
      y: (y3 + k * (x2-x1))
    }
  }

  document.addEventListener('mousemove', mouseMove);

  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', mouseMove);
    svg.style.cursor = 'unset';
  });

  return false;
}
