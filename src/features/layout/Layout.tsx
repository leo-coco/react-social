import type React from 'react';
import { Layout as AntLayout } from 'antd';
import { Outlet } from 'react-router-dom';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import { UserProvider } from '../users/UserContext';

const { Content } = AntLayout;

const Layout: React.FC = () => (
  <UserProvider>
    <AntLayout style={{ minHeight: '100vh' }}>
        <Header />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ padding: 24, minHeight: 380 }}>
          <Outlet /> {/* This is where the routed content will be rendered */}
        </div>
      </Content>
        <Footer />
    </AntLayout>
  </UserProvider>
);

export default Layout;
