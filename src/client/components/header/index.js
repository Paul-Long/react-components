import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.less';

type Props = {
  className: string,
  menus: Array,
  githubIcon: boolean,
}

function Header(props: Props) {
  const {
    className,
    menus,
    githubIcon,
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
      {githubIcon && (
        <a className={`${className}-github`} href='https://github.com/Paul-Long/react-components' target='_blank'>
          <img src='https://github.com/fluidicon.png' width={32} height={32} title='查看源码' />
        </a>
      )}
    </div>
  );
}

export default Header;
