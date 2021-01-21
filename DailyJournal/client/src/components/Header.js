import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='navbar navbar-expand navbar-dark bg-info'>
      <Link to='/' className='navbar-brand'>
        DailyJournal
      </Link>
      <ul className='navbar-nav mr-auto'>
        <li className='nav-item'>
          <Link to='/' className='nav-link'>
            Entries
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/entries/add' className='nav-link'>
            New Entry
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
