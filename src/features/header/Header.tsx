import type React from 'react';
import { Link } from 'react-router-dom';
import { UsersContainer } from '../users/Users';
import { Layout, Menu } from 'antd';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  return (
    <AntHeader>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <div style={{ marginLeft: 'auto' }}>
        Logged in as: <UsersContainer />
      </div>
      </Menu>
    </AntHeader>
  );
}

export default Header;
