import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { IMessage } from './message.type';

const LOCAL_STORAGE_KEY = 'chatData';

export const useChat = (currentUserId: number, receiverId: number) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [userConversations, setUserConversations] = useState<any[]>([]);

  useEffect(() => {
    const loadMessages = () => {
      const chatData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      const userConversations = chatData.users?.[currentUserId]?.conversations?.[receiverId] || [];
      setMessages(userConversations);
    };

    const loadUserConversations = () => {
      const chatData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      const conversations = chatData.users?.[currentUserId]?.conversations || {};
      const users = Object.keys(conversations).map(id => ({ id, name: `User ${id}` })); 
      setUserConversations(users);
    };

    loadMessages();
    loadUserConversations();
  }, [receiverId, currentUserId]);

  useEffect(() => {
    const updateMessages = () => {
      const chatData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || { users: {} };
      if (!chatData.users[currentUserId]) {
        chatData.users[currentUserId] = { conversations: {} };
      }
      if (!chatData.users[currentUserId].conversations[receiverId]) {
        chatData.users[currentUserId].conversations[receiverId] = [];
      }
      chatData.users[currentUserId].conversations[receiverId] = messages;
      // Ensure the receiver also has the updated conversation
      if (!chatData.users[receiverId]) {
        chatData.users[receiverId] = { conversations: {} };
      }
      if (!chatData.users[receiverId].conversations[currentUserId]) {
        chatData.users[receiverId].conversations[currentUserId] = [];
      }
      chatData.users[receiverId].conversations[currentUserId] = messages;

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chatData));
    };

    updateMessages();
  }, [messages, receiverId, currentUserId]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: uuidv4(),
        text: inputValue,
        timestamp: new Date().toISOString(),
        senderId: currentUserId,
        receiverId: receiverId,
        status: 'sent',
      };

      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInputValue('');
    }
  };

  return {
    messages,
    inputValue,
    setInputValue,
    handleSendMessage,
    userConversations,
  };
};
