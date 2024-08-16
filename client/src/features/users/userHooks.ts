import type { IUser } from "./user.type";
import { useFetchAll, useFetchById } from "../../services/baseHooks";

export const useFetchAllUsers = () => {
  return useFetchAll<IUser>('users');
};

export const useFetchUserById = (id: string) => {
  return useFetchById<IUser>('users', id);
};