import * as React from 'react';
import { NavLink } from 'react-router-dom';
import find from 'lodash/find';
import { Asgard } from '@/types';
import './nav.less';

export default function Nav() {
  const navList = find(asgardTree[0].resourceBos, item => item.code === 'tbb-broker-web') || {};
  const resourceBos = navList.resourceBos || [];
  return (
    <ul className="nav">
      {resourceBos.map((item: Asgard) => {
        const url = item.url
          .split('/')
          .slice(3)
          .join('/');
        return (
          <li className="nav-item" key={item.code}>
            <NavLink to={`/${url}`} activeClassName="active">
              {item.name}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
