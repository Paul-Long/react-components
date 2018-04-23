import React from 'react';
import {NavLink} from 'react-router-dom';
import './header.less';

type Props = {
  className: string,
  menus: Array
}

function Header(props: Props) {
  const {
    className,
    menus
  } = props;
  return (
    <div className={`ac-header ${className}`}>
      {menus.map(menu => (
        <NavLink
          key={menu.path}
          to={menu.path}
          activeClassName='active'
        >{menu.title}</NavLink>
      ))}
    </div>
  )
}

export default Header;
