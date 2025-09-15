// API queries for Auth

import { useQuery } from "@tanstack/react-query";
import { protectedApi } from "@/config/kyInstance";
import type { UserResponse } from "@/features/auth/types";
import { AUTH_URLS } from "@/features/auth/urls";

export const useUser = () => {
  return useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: async () => {
      return await protectedApi.get(AUTH_URLS.user).json<UserResponse>();
    },
  });
};
