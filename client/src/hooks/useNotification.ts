// hooks/useNotification.ts
import { notification } from "antd"

type NotificationType = "success" | "info" | "warning" | "error"

const useNotification = () => {
  const openNotification = (
    type: NotificationType,
    message: string,
    description?: string,
  ) => {
    notification[type]({
      message,
      description,
    })
  }

  return { openNotification }
}

export default useNotification
