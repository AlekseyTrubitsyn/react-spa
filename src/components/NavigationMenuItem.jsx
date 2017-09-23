import React from 'react';

function NavigationMenuItem(props) {
  const linkClassName = 'navigation-menu__button' + ((props.active) ? ' navigation-menu__button--active' : '');

  function handleClick(e) {
    e.preventDefault();
    props.onClick(props.id);
  }

  return (
    <li className='navigation-menu__item'>
      <a className={linkClassName} href="#" onClick={handleClick} id={props.id}>{props.title}</a>
    </li>
  )
}

export default NavigationMenuItem;
