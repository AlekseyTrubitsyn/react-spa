import { connect } from 'react-redux';

import { changeDimension } from '../actions';
import PolygonScreen from '../components/PolygonScreen/PolygonScreen';

function mapStateToProps(state) {
  return {
    dimensions: state.dimensions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: (id, value) => { dispatch(changeDimension(id, value)); },
    onPointDrag: (id, value, basePoint, event) => { handlePointDrag(event, id, value, basePoint, dispatch); }
  }
}

const PolygonScreenContainer = connect(mapStateToProps, mapDispatchToProps)(PolygonScreen);

export default PolygonScreenContainer;

function handlePointDrag(eStart, id, value, bPoint, dispatch) {
  const center = { x: 100, y: 100 };

  let target = eStart.currentTarget;
  target.ondragstart = () => false;

  let g = target.parentNode;
  let svg = g.parentNode;
  let svgBCR = svg.getBoundingClientRect();

  svg.style.cursor = 'pointer';

  let centerPoint = {
    x: svgBCR.left + center.x,
    y: svgBCR.top + center.y
  };

  let basePoint = {
    x: svgBCR.left + +bPoint.x,
    y: svgBCR.top + +bPoint.y
  }

  let startPoint = {
    x: eStart.clientX,
    y: eStart.clientY
  };

  let dxStartToCenter = getRange(startPoint, centerPoint);
  let dxBaseToCenter = getRange(basePoint, centerPoint);

  function mouseMove(eMoving) {
    let movingPoint = {
      x: eMoving.clientX,
      y: eMoving.clientY
    };

    let projectionPoint = getProjectedPoint(movingPoint);

    let dxProjectionToCenter = getRange(projectionPoint, centerPoint);
    let dxProjectionToBase = getRange(projectionPoint, basePoint);

    let newValue = 100 * (dxProjectionToCenter / dxBaseToCenter);

    if ((dxProjectionToCenter <= dxBaseToCenter) && (dxProjectionToBase <= dxBaseToCenter)) {
      dispatch(changeDimension(id, newValue));
    }
  }

  function getRange(first, second) {
    let dx = Math.abs(first.x - second.x);
    let dy = Math.abs(first.y - second.y);

    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }

  function getProjectedPoint(movingPoint) {
    let x1 = basePoint.x;
    let y1 = basePoint.y;
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
}
