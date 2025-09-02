// API mutations for Auth

import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/config/kyInstance";
import type { SignUpResponse } from "@/features/auth/types";
import { AUTH_URLS } from "@/features/auth/urls";
import type { SignUpValidation } from "@/features/auth/validations";

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (values: SignUpValidation) => {
      await authApi
        .post(AUTH_URLS.signUp, { json: values })
        .json<SignUpResponse>();
    },
  });
};

export const useSignIn = () => {};

export const useVerifyJWT = () => {};

export const useRefreshJWT = () => {};

export const useResetPassword = () => {};
