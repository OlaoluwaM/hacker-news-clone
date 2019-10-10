import React from 'react';
import { NavLink } from 'react-router-dom';

const activeStyle = {
  color: 'rgb(187, 46, 31)'
};

export default class Nav extends React.Component {
  render() {
    return (
      <nav className='row space-between'>
        <ul className='row nav'>
          <li>
            <NavLink
              activeStyle={activeStyle}
              className='nav-link'
              exact
              to='/'>
              Top
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={activeStyle} className='nav-link' to='/new'>
              New
            </NavLink>
          </li>
        </ul>
        <button className='btn-clear'></button>
      </nav>
    );
  }
}
