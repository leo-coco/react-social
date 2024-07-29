import type React from 'react';
import { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { usePost } from '../../services/baseHooks';
import { useUser } from '../users/UserContext';
import type { IComment } from './comment.type';

const { TextArea } = Input;

interface AddCommentModalProps {
  postId: string;
  onSuccess: (newComment: IComment) => void;
  onClose: () => void;
}

const AddCommentModal: React.FC<AddCommentModalProps> = ({postId, onSuccess, onClose}) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const userContext = useUser();

  const { mutate: createComment } = usePost<IComment>('comments');

  const handleSubmit = async (values: { body: string }) => {
    const newComment = {
      email: userContext?.email,
      postId: postId,
      name: '',
      body: values.body,
    } as IComment;

    createComment(newComment, {
      onSuccess: (newComment: IComment) => {
        onSuccess(newComment);
        setIsModalVisible(false);
      },
      onError: (error) => {
        console.error('Error posting the new comment:', error);
      },
    });
  }

  const handleCancel = () => {
    onClose();
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title="What do you want to share?"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Hide default footer
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ title: '', body: '' }}
        >
          <Form.Item
            name="body"
            rules={[{ required: true, message: 'Please enter the comment content!' }]}
          >
            <TextArea rows={2} placeholder="Enter your post comment..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add comment
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddCommentModal;
