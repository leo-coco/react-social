import { describe, it, expect, vi, beforeEach } from "vitest"
import { BaseService } from "../../services/baseService"
import { UserService } from "./userAPI"

// Mocking BaseService class
vi.mock("../../services/baseService", () => ({
  BaseService: vi.fn(),
}))

describe("UserService", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should extend BaseService with IUser type and entity "users"', () => {
    const userService = new UserService()

    expect(BaseService).toHaveBeenCalledWith("users")
    expect(userService).toBeInstanceOf(BaseService)
  })
})
