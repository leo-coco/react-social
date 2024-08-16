import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UsersContainer } from '../users/Users';

const { Header: AntHeader } = Layout;

const menuItems = [
  {
    key: '1',
    label: <Link to="/">Home</Link>,
  },
  {
    key: '2',
    label: <Link to="/chat">Chat</Link>,
  },
  {
    key: '3',
    label:   <div style={{ marginLeft: 'auto', color: 'white' }}>
    Logged in as: <UsersContainer />
  </div>,
  },
];

const MyHeader = () => (
  <AntHeader>
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      items={menuItems}
    />
  
  </AntHeader>
);

export default MyHeader;
