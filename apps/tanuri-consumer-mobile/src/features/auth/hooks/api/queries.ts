// API queries for Auth

import { useQuery } from "@tanstack/react-query";
import { protectedApi } from "@/config/kyInstance";
import { useSession } from "@/features/auth/hooks/session";
import type { UserResponse } from "@/features/auth/types";
import { AUTH_URLS } from "@/features/auth/urls";

export const useUser = () => {
  const { session } = useSession();

  return useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: async () => {
      if (!session?.access) {
        throw new Error("JWT token is required to fetch user data");
      }

      return await protectedApi(session.access)
        .get(AUTH_URLS.user)
        .json<UserResponse>();
    },
  });
};
