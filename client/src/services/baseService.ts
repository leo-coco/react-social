export interface ICursorBasedEntities<T> {
  entities: T[],
  meta: {
    nextCursor: number | null;
    hasMore: boolean;
  }
}

export interface IBaseService<T> {
  getById(id:string): Promise<T>
  getAll(queryParams: string): Promise<T[]>
  getCursorBasedEntities(queryParams: string): Promise<ICursorBasedEntities<T>>
}


export class BaseService<T> implements IBaseService<T>{
  protected baseUrl = '';
  protected entity = '';

  constructor (pEntity: string) {
      this.entity = pEntity;
      this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'mock-api';
  }
  public async getAll(queryParams?: string): Promise<T[]> {
    try {
      const url = queryParams ? `${this.baseUrl}/${this.entity}?${queryParams}` : `${this.baseUrl}/${this.entity}`;
      const response = await fetch(url);
      if (!response.ok) {
        await this.handleError(response);
       }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  public async getCursorBasedEntities(queryParams: string): Promise<ICursorBasedEntities<T>> {
    try {
      const url = `${this.baseUrl}/${this.entity}?${queryParams}`;
      const response = await fetch(url);
      if (!response.ok) {
        await this.handleError(response);
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
        await this.handleError(response);
       }
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  public async post(data: Omit<T, 'id'>): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.entity}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
       await this.handleError(response);
      }

      const responseData = await response.json();
      return responseData;

    } catch (error: any) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  protected async handleError(response: any) {
    const errorResponse = await response.json();
    const errorMessage = errorResponse.message || `Error: ${errorResponse.status} ${errorResponse.statusText}`;
    const errorDetails = errorResponse.error || null;
    throw new Error(errorMessage, {cause: errorDetails});
  }
}