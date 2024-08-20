import type React from "react"
import { useState } from "react"
import { Modal, Form, Input, Button } from "antd"
import { useUser } from "../users/UserContext"
import type { AddCommentPayload, IComment } from "./comment.type"
import useNotification from "../../hooks/useNotification"
import { PostService } from "../posts/postAPI"
import { useMutation } from "@tanstack/react-query"

const { TextArea } = Input

interface AddCommentModalProps {
  postId: string
  onSuccess: (newComment: IComment) => void
  onClose: () => void
}

const AddCommentModal: React.FC<AddCommentModalProps> = ({
  postId,
  onSuccess,
  onClose,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const userContext = useUser()

  const { openNotification } = useNotification()

  const addComment = useMutation({
    mutationFn: (newComment: AddCommentPayload) => {
      const service = new PostService()
      setIsLoading(true)
      return service.addComment(
        newComment.postId,
        newComment.userId,
        newComment.content,
      )
    },
    onSuccess: (data: IComment) => {
      onSuccess(data)
      setIsLoading(false)
      setIsModalVisible(false)
    },
    onError: (error: any) => {
      setIsLoading(false)
      openNotification("error", error.message)
    },
  })

  const handleSubmit = async (values: { body: string }) => {
    const newComment = {
      postId,
      userId: userContext?.id,
      content: values.body,
    } as AddCommentPayload

    addComment.mutate(newComment)
  }

  const handleCancel = () => {
    onClose()
    setIsModalVisible(false)
  }

  return (
    <>
      <Modal
        title="What do you want to share?"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ title: "", body: "" }}
        >
          <Form.Item
            name="body"
            rules={[
              { required: false, message: "Please enter the comment content" },
            ]}
          >
            <TextArea rows={2} placeholder="Enter your comment..." />
          </Form.Item>
          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit" block>
              Add comment
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddCommentModal
