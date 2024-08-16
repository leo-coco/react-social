import { useState } from 'react';
import { Input, Button, List, Typography, Layout, Menu, Select, Spin } from 'antd';
import { useUser } from '../users/UserContext';
import { useFetchAllUsers } from '../users/userHooks';
import { useChat } from './useChat';
const { TextArea } = Input;
const { Title } = Typography;
const { Sider, Content } = Layout;
const { Option } = Select;

const ChatApp = () => {
  const [receiverId, setReceiverId] = useState<number>(1);
  const user = useUser();
  const currentUserId = user?.id;
  const { isPending, error, data: users } = useFetchAllUsers();

  const { messages, inputValue, setInputValue, handleSendMessage, userConversations } = useChat(currentUserId, receiverId);

  const handleUserChange = (userId: number) => {
    setReceiverId(userId);
  };

  if (isPending) {
    return <Spin />;
  }

  if (error) {
    return <>Error</>;
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={200} className="site-layout-background">
        <Select
          showSearch
          placeholder="Search to start a new conversation"
          onSelect={(value) => handleUserChange(Number(value))}
          style={{ width: '100%', marginBottom: '10px' }}
        >
          {users?.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        </Select>
        <Menu
          mode="inline"
          defaultSelectedKeys={[receiverId.toString()]}
          style={{ height: '100%', borderRight: 0 }}
          onClick={(e) => handleUserChange(parseInt(e.key))}
        >
          {userConversations.map((user) => (
            <Menu.Item key={user.id.toString()}>{user.name}</Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ padding: '24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Title level={2}>Chat with {receiverId}</Title>
          <List
            bordered
            dataSource={messages}
            renderItem={(item) => (
              <List.Item>
                <div>
                  <strong>{item.senderId}:</strong> {item.text}
                  <div style={{ fontSize: 'small', color: 'gray' }}>
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                </div>
              </List.Item>
            )}
            style={{ height: '300px', overflowY: 'scroll', marginBottom: '10px' }}
          />
          <TextArea
            rows={4}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message"
          />
          <Button
            type="primary"
            onClick={handleSendMessage}
            style={{ marginTop: '10px' }}
          >
            Send
          </Button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatApp;
