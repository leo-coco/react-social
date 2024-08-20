import { describe, it, expect, vi, beforeEach } from "vitest"
import type { Request, Response } from "express"
import type { PrismaFormattedError } from "../../../types/prismaError"
import type { IUserService } from "../../services/userService"
import { UserController } from "../userController"
import { mockUsers } from "../../mocks/mockUser"

const mockService: IUserService = {
  getAll: vi.fn(),
}

const controller = new UserController(mockService)

describe("UserController", () => {
  let mockReq: Partial<Request>
  let mockRes: Partial<Response>

  beforeEach(() => {
    mockReq = {}
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    }
  })

  describe("getUsers", () => {
    it("should return users successfully", async () => {
      const mock = mockUsers();
      
      mockService.getAll = vi.fn().mockResolvedValue(mock)

      await controller.getUsers(mockReq as Request, mockRes as Response)

      expect(mockRes.json).toHaveBeenCalledWith(mock)
    })

    it("should handle errors from the service", async () => {
      const error = {
        httpStatus: 500,
        errorMessage: "error message",
      } as PrismaFormattedError
      mockService.getAll = vi.fn().mockRejectedValue(error)

      await controller.getUsers(mockReq as Request, mockRes as Response)

      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Error getting users",
        error: error.errorMessage,
      })
    })
  })
})
