import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import { BaseService } from "./baseService"

export const useFetchAll = <T>(entity: string, queryParams = "") => {
  const service = new BaseService<T>(entity)

  return useQuery({
    queryKey: [entity, queryParams],
    queryFn: () => service.getAll(queryParams),
  })
}

export const useFetchCursorBasedEntities = <T>(
  entity: string,
  queryParams = "",
) => {
  const service = new BaseService<T>(entity)

  return useInfiniteQuery({
    queryKey: [entity, queryParams],
    queryFn: ({ pageParam: cursor }) => {
      return service.getCursorBasedEntities(`${queryParams}&cursor=${cursor}`)
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.meta.nextCursor,
  })
}

export const useFetchById = <T>(entity: string, id: string) => {
  const service = new BaseService<T>(entity)

  return useQuery({
    queryKey: [entity, id],
    queryFn: () => service.getById(id),
  })
}

export const usePost = <T>(entity: string) => {
  const service = new BaseService<T>(entity)

  return useMutation({
    mutationFn: (data: T) => service.post(data),
  })
}
