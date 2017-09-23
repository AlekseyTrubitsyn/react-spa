import React from 'react';

import NavigationMenuItem from './NavigationMenuItem';

function NavigationMenu(props) {
  return (
    <nav className="navigation-menu">
      <ul>
        {props.screens.map(screen =>
          <NavigationMenuItem
            key={screen.id}
            id={screen.id}
            onClick={props.onClick}
            title={screen.menuTitle}
            active={screen.active}
          />
        )}
      </ul>
    </nav>
  );
}

export default NavigationMenu;
