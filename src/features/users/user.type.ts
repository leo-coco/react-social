export interface IAddress {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: {
        lat: string,
        lng: string
      }
}

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  address: IAddress
  phone: string;
  website: string;
}