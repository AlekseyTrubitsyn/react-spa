import React from 'react';

function NavigationMenuItem(props) {
  const className = 'navigation-menu__item' + ((props.active) ? ' navigation-menu__item--active' : '');

  function handleClick(e) {
    e.preventDefault();
    props.onClick(props.id);
  }

  return (
    <li className={className}>
      <a href="#" onClick={handleClick} id={props.id}>{props.title}</a>
    </li>
  )
}

export default NavigationMenuItem;
