import { useQuery } from "@tanstack/react-query";
import { protectedApi } from "@/config/kyInstances";
import { useSession } from "@/features/auth";
import type { AddressResponse } from "../../types";
import { PROTILE_URLS } from "../../urls";

// API queries for Profile
export const useGetAddresses = () => {
  const { session } = useSession();

  const query = useQuery<AddressResponse[]>({
    queryKey: ["addresses"],
    queryFn: async () => {
      if (!session) {
        throw new Error("JWT token is required to fetch user data");
      }
      return await protectedApi(session.access)
        .get(PROTILE_URLS.address)
        .json<AddressResponse[]>();
    },
  });

  return query;
};
