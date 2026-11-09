export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  phone: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}
export interface AuthState {
  isPending: boolean;
  isActive: boolean;
  isBlock: boolean;
  pending: string | null;
  isError: boolean;
  error: string | null;
  user: User | null;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
}
