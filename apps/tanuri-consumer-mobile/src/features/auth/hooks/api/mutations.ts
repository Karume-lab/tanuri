// API mutations for Auth

import { useMutation } from "@tanstack/react-query";
import type { SignUpValidation } from "@/features/auth/validations";

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (values: SignUpValidation) => {
      await console.log("Sign up values:", values);
    },
  });
};

export const useSignIn = () => {};

export const useVerifyJWT = () => {};

export const useRefreshJWT = () => {};

export const useResetPassword = () => {};
