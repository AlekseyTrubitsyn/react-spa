import React from 'react';

// TODO basePoint (before changes);
function PolygonDot(props) {
  function handlePointDrag(event) {
    event.preventDefault();
    props.onPointDrag(props.id, event);
  }

  return (
    <circle
      r="4"
      cx={ props.cx }
      cy={ props.cy }
      key={ props.id }
      className={ props.className }
      fill={ props.fill }
      onMouseDown={ handlePointDrag }
    />
  )
}

export default PolygonDot;
