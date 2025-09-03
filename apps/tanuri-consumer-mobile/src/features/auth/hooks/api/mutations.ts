// API mutations for Auth

import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { authApi } from "@/config/kyInstance";
import type { SignUpError, SignUpResponse } from "@/features/auth/types";
import { AUTH_URLS } from "@/features/auth/urls";
import type { SignUpValidation } from "@/features/auth/validations";

export const useSignUp = () => {
  return useMutation<SignUpResponse, SignUpError, SignUpValidation>({
    mutationFn: async (values) => {
      try {
        const response = await authApi
          .post(AUTH_URLS.signUp, {
            json: values,
          })
          .json<SignUpResponse>();
        return response;
      } catch (error) {
        if (error instanceof HTTPError) {
          const errorData = await error.response.json();
          throw errorData;
        }
        throw error;
      }
    },
  });
};

export const useSignIn = () => {};

export const useVerifyJWT = () => {};

export const useRefreshJWT = () => {};

export const useResetPassword = () => {};
