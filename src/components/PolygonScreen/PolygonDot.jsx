import React from 'react';

function PolygonDot(props) {
  function handlePointDrag(event) {
    event.preventDefault();
    event.currentTarget.ondragstart = () => false;

    if (!props.dotsDragable) return;

    let throttledDrag = throttle(props.onPointDrag, 100, this);
    throttledDrag(props.id, props.currentValue, props.basePoint, event);
  }

  function throttle(func, limit) {
    let inThrottle;

    return function() {
      let args = arguments;
      let context = this;

      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;

        return setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  return (
    <circle
      r="4"
      cx={ props.cx }
      cy={ props.cy }
      className={ props.className }
      fill={ props.fill }
      onMouseDown={ handlePointDrag }
    />
  )
}

export default PolygonDot;
