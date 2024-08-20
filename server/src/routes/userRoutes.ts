import { Router } from "express"
import { UserService } from "../services/userService"
import { UserController } from "../controllers/userController"

const router = Router()

const service = new UserService()
const controller = new UserController(service)

router.get("/", controller.getUsers)

export default router
