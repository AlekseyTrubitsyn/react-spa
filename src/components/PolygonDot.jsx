import React from 'react';

//TODO Math and Logic to containers or reducers
function PolygonDot(props) {
  let id = props.id;
  let cx = props.cy;
  let cy = props.cy;

  function handleDrag(eStart) {
    eStart.preventDefault();

    const center = { x: 100, y: 100 };

    let target = eStart.currentTarget;
    target.ondragstart = () => false;

    let g = target.parentNode;
    let gBCR = g.getBoundingClientRect();

    let centerPoint = { x: gBCR.left + center.x, y: gBCR.top + center.x };
    let startPoint = { x: eStart.clientX, y: eStart.clientY};

    let dxStartToCenter = getRange(startPoint, centerPoint);

    function mouseMove(eMoving) {
      let movingPoint = { x: eMoving.clientX, y: eMoving.clientY };
      let projectionPoint = getProjectedPoint(movingPoint);

      let dxProjectionToCenter = getRange(projectionPoint, centerPoint);
      let dxProjectionToStart = getRange(projectionPoint, startPoint);

      if ((dxProjectionToCenter <= dxStartToCenter) && (dxProjectionToStart <= dxStartToCenter)) {
        console.log(dxProjectionToCenter, dxProjectionToStart, dxStartToCenter);
        //TODO setState => change dimensions
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
    });
  }


  return (
    <circle
      r="4"
      cx={ props.cx }
      cy={ props.cy }
      key={ props.id }
      className={ props.className }
      fill={ props.fill }
      onMouseDown={ handleDrag }
    />
  )
}

export default PolygonDot;
