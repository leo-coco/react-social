import type React from 'react';
import { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { usePost } from '../../services/baseHooks';
import type { IPost } from './post.type';
import { useUser } from '../users/UserContext';
import { useQueryClient } from '@tanstack/react-query';
import useNotification from '../../hooks/useNotification';


const { TextArea } = Input;

const AddPostModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userContext = useUser();
  const queryClient = useQueryClient();

  const { openNotification } = useNotification();

  const { mutate: createPost } = usePost<IPost>('posts');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = async (values: { title: string, body: string }) => {
    setIsLoading(true);
    const newPost = {
      userId: userContext?.id,
      title: values.title,
      content: values.body,
    } as IPost;

    createPost(newPost, {
      onSuccess: (newPost: IPost) => {
        queryClient.setQueryData(['posts', `userId=${userContext?.id}` ], (oldData: IPost[]) => {
          return [newPost, ...(oldData || [])];
        });
        setIsLoading(false);
        setIsModalVisible(false);
      },
      onError: (error) => {
        setIsLoading(false);
        openNotification('error', error.message)
      },
    });
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Post
      </Button>
      <Modal
        title="What do you want to share?"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ title: '', body: '' }}
        >
          <Form.Item
            name="title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>
          <Form.Item
            name="body"
            rules={[{ required: true, message: 'Please enter the post content!' }]}
          >
            <TextArea rows={4} placeholder="Enter your post here..." />
          </Form.Item>
          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit" block>
              Add Post
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPostModal;
