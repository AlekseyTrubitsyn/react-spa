import React from 'react';

import Screen from './Screen';

function Screens(props) {
  return (
    <main>
      {props.screens.map(item =>
        <Screen
          key={item.id}
          id={item.id}
          title={item.title}
          active={item.active}
        />
      )}
    </main>
  )
}

export default Screens;
