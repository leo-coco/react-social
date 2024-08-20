import { renderHook } from "@testing-library/react"

import { vi } from "vitest"
import { useFetchAll, useFetchById } from "../baseHooks"
import { useQuery } from "@tanstack/react-query"

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}))

describe("useFetchAll", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should call useQuery with proper parameters", () => {
    const entity = "testEntity"
    const queryParams = "testParams"

    renderHook(() => useFetchAll(entity, queryParams))

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: [entity, queryParams],
      queryFn: expect.any(Function),
    })
  })
})

describe("useFetchById", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should call useQuery with proper parameters", () => {
    const entity = "testEntity"
    const id = "1"

    renderHook(() => useFetchById(entity, id))

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: [entity, id],
      queryFn: expect.any(Function),
    })
  })
})
