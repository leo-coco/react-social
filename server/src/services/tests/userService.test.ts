import { describe, it, expect, vi } from "vitest"
import { UserService } from "../userService"
import { prisma } from "../../db/prisma"
import { mockUsers } from "../../mocks/mockUser"

describe("UserService", () => {
  it("should return a list of users when the database has users", async () => {
    const mock = mockUsers();

    vi.spyOn(prisma.user, "findMany").mockResolvedValue(mock)

    const userService = new UserService()
    const users = await userService.getAll()

    expect(users).toEqual(mock)
  })
})
