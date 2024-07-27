import { useMutation, useQuery } from '@tanstack/react-query';
import { BaseService } from './baseService'; 

export const useFetchAll = <T>(entity: string, queryParams = "") => {
  const service = new BaseService<T>(entity); 

  const queryKey = queryParams ? `${entity}-fetchAll-${queryParams}` : `${entity}-fetchAll`

  return useQuery({
    queryKey: [queryKey],
    queryFn: () => service.getAll(queryParams),
    staleTime: 50000,
  })
};

export const useFetchById = <T>(entity: string, id: string) => {
  const service = new BaseService<T>(entity);

  return useQuery({
    queryKey: [`${entity}-fetchById`],
    queryFn: () => service.getById(id),
  })
};


export const usePost = <T>(entity: string) => {
  const service = new BaseService<T>(entity);

  return useMutation({
    mutationFn: (data: T) => service.post(data),
  });
};


