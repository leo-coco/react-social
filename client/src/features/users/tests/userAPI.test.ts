import { describe, it, expect, vi, beforeEach } from "vitest"
import { BaseService } from "../../../services/baseService"
import { UserService } from "../userAPI"

vi.mock('../../../services/baseService');

describe("UserService", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should extend BaseService', () => {
    const service = new UserService()

    expect(BaseService).toHaveBeenCalledWith("users")
    expect(service).toBeInstanceOf(BaseService)
  })
})
