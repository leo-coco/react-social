import { useFetchAll, useFetchById } from "../../services/baseHooks";
import type { IAlbum } from "./album.type";

export const useFetchAllAlbums = () => {
  return useFetchAll<IAlbum>('albums');
};

export const useFetchAlbumById = (id: string) => {
  return useFetchById<IAlbum>('albums', id);
};

export const useFetchAlbumsByUser = (userId: string) => {
  return useFetchAll<IAlbum>('albums', `userId=${userId}`);
};