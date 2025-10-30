import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { useToast } from "@/components/ui/toast";
import { protectedApi } from "@/config/kyInstances";
import { useSession } from "@/features/auth";
import type { AddressResponse } from "../../types";
import { PROTILE_URLS } from "../../urls";
import type { Address } from "../../validations";

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  const { session } = useSession();
  const toast = useToast();

  return useMutation<AddressResponse, Error, Address>({
    mutationFn: async (data) => {
      try {
        if (!session) {
          throw new Error("JWT token is required to fetch user data");
        }
        const response = protectedApi(session.access)
          .post(PROTILE_URLS.address, {
            json: data,
          })
          .json<AddressResponse>();
        return response;
      } catch (error) {
        if (error instanceof HTTPError) {
          const errorData = await error.response.json();
          throw errorData;
        }
        throw error;
      }
    },
    onSuccess: async () => {
      toast.success(" Address added successfully");
      await queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
