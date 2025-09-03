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
