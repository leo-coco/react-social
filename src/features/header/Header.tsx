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
        <Menu.Item key="3" >
      <UsersContainer />
      </Menu.Item>
      </Menu>

    </AntHeader>
  );
}

export default Header;
