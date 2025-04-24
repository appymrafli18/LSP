export interface REGISTER {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface LOGIN {
  email: string;
  password: string;
}

export interface USER {
  id?: number;
  uuid?: string;
  username?: string;
  name: string;
  email: string;
  role: string;
  password?: string;
}
