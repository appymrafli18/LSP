export interface IAirlines {
  id: number;
  uuid: string;
  name: string;
  logo: string | File;
  createdAt: string;
  updatedAt: string;
  user: { id: number; name: string };
}

interface IUser {
  id: number;
  uuid: string;
  username: string;
  name: string;
  email: string;
}

export interface IAirlinesAPI {
  id: number;
  name: string;
  logo: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}

export interface IBodyAirlines {
  name: string;
  logo: File;
  userId?: number;
}
