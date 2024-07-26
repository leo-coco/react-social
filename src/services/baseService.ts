

export interface IBaseService<T> {
  getById(id:string): Promise<T>
  getAll(queryParams: string): Promise<T[]>
}


export class BaseService<T> implements IBaseService<T>{
  private baseUrl = 'https://jsonplaceholder.typicode.com';
  private entity = '';

  constructor (pEntity: string) {
      this.entity = pEntity;
  }
  public async getAll(queryParams?: string): Promise<T[]> {
    try {
      const url = queryParams ? `${this.baseUrl}/${this.entity}?${queryParams}` : `${this.baseUrl}/${this.entity}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Fetch error:', error);
      throw error;
    }
  }


  public async getById(id: string): Promise<T> {
    try {
      const response = await fetch( `${this.baseUrl}/${this.entity}/${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  public post() {

  }

  public delete() {

  }

  public patch() {

  }

  public put () {

  }

}