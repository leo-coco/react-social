import type React from 'react';
import { Link } from 'react-router-dom';
import { UsersContainer } from '../users/Users';


const Header: React.FC = () => {
  return (
<header>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to={`/albums`}>Albums</Link></li>
        <li><Link to={`/posts`}>Posts</Link></li>
      </ul>
      <UsersContainer></UsersContainer>
    </nav>
  </header>
  );
}

export default Header;