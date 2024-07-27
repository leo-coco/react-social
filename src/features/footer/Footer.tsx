import type React from 'react';
import { Layout, Typography } from 'antd';

const { Footer } = Layout;
const { Text } = Typography;

const AppFooter: React.FC = () => (
  <Footer style={{ textAlign: 'center', backgroundColor: '#f0f2f5' }}>
    <Text>&copy; 2024 My Application</Text>
  </Footer>
);

export default AppFooter;
