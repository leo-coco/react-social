import { BaseService } from "../../services/baseService";
import type { IAlbum } from "./album.type";

export class AlbumService extends BaseService<IAlbum> {
  constructor() {
    super('albums')
  }

  public async getByUser(userId: string): Promise<IAlbum[]> {
    return this.getAll(`userId=${userId}`)
  }
}