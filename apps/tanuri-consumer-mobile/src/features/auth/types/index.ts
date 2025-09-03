// Types for Auth
export interface SignUpResponse {
  id: number;
  email: string;
}

export interface SignUpError {
  email?: string[];
  password?: string[];
  [key: string]: string[] | undefined;
}

export interface SignInResponse {
  refresh: string;
  access: string;
}

export interface SignInError {
  email?: string[];
  password?: string[];
  [key: string]: string[] | undefined;
}

export interface Session {
  userId: string;
  email: string;
  access: string;
  refresh: string;
}
