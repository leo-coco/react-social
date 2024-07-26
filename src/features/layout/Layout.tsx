import type React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import { UserProvider } from '../users/UserContext';

const Layout: React.FC = () => (
  <UserProvider>
    <div>
      <Header />
      <main>
        <Outlet /> {/* This is where the routed content will be rendered */}
      </main>
      <Footer />
    </div>
  </UserProvider>
);

export default Layout;
