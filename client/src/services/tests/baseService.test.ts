import type { Mock } from "vitest"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { BaseService } from "../baseService"

global.fetch = vi.fn()

const mockData = { id: 1, name: "Test" }
const mockArrayData = [mockData]

describe("BaseService", () => {
  let service

  beforeEach(() => {
    service = new BaseService("posts")
    fetch.mockClear()
  })

  describe("getAll", () => {
    it("should fetch all data with query params", async () => {
      ;(fetch as Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockArrayData,
      })

      const data = await service.getAll("userId=1")
      expect(data).toEqual(mockArrayData)
      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/posts?userId=1")
    })

    it("should fetch all data without query params", async () => {
      ;(fetch as Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockArrayData,
      })

      const data = await service.getAll()
      expect(data).toEqual(mockArrayData)
      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/posts")
    })

    it("should throw an error if the fetch fails", async () => {
      ;(fetch as Mock).mockResolvedValueOnce({
        ok: false,
        json: () =>
          Promise.resolve({
            status: 404,
            statusText: "Not Found",
            message: "Resource not found",
          }),
      })

      await expect(service.getById("1")).rejects.toThrow("Resource not found")
    })
  })

  describe("getById", () => {
    it("should fetch data by id", async () => {
      ;(fetch as Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const data = await service.getById("1")
      expect(data).toEqual(mockData)
      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/posts/1")
    })

    it("should throw an error if the fetch fails", async () => {
      ;(fetch as Mock).mockResolvedValueOnce({
        ok: false,
        json: () =>
          Promise.resolve({
            status: 404,
            statusText: "Not Found",
            message: "Resource not found",
          }),
      })

      await expect(service.getById("1")).rejects.toThrow("Resource not found")
    })
  })

  describe("post", () => {
    it("should post data and return the response", async () => {
      ;(fetch as Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const data = await service.post({ name: "Test" })
      expect(data).toEqual(mockData)
      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "Test" }),
      })
    })

    it("should throw an error if the post fails", async () => {
      ;(fetch as Mock).mockResolvedValueOnce({
        ok: false,
        json: () =>
          Promise.resolve({
            status: 404,
            statusText: "Not Found",
          }),
      })

      await expect(service.post({ name: "Test" })).rejects.toThrow(
        "Error: 404 Not Found",
      )
    })
  })
})
