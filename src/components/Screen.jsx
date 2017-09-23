import React from 'react';

function Screen(props) {
  const className = 'screen' + ((props.active) ? '' : ' screen-hide');

  return (
    <article className={className}>
      <h2>{props.title}</h2>
    </article>
  )
}

export default Screen;
