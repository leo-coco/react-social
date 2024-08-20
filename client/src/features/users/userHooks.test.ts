import { describe, it, expect, vi, beforeEach } from "vitest"

import { useFetchAll, useFetchById } from "../../services/baseHooks"
import { renderHook } from "@testing-library/react"
import { useFetchAllUsers, useFetchUserById } from "./userHooks"

vi.mock("../../services/baseHooks", () => ({
  useFetchAll: vi.fn(),
  useFetchById: vi.fn(),
}))

describe("userHooks", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call useFetchAll with "users" for useFetchAllUsers', () => {
    renderHook(() => useFetchAllUsers())
    expect(useFetchAll).toHaveBeenCalledWith("users")
  })

  it('should call useFetchById with "users" and the given id for useFetchUserById', () => {
    const id = "123"
    renderHook(() => useFetchUserById(id))
    expect(useFetchById).toHaveBeenCalledWith("users", id)
  })
})
