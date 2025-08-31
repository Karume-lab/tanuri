"use client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type React from "react";
import { useState } from "react";
import { theme } from "@/styles/mantine-theme";

interface ProviderContainerProps {
  children: React.ReactNode;
}

const ProvidersContainer: React.FC<ProviderContainerProps> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications />
        <NuqsAdapter>{children}</NuqsAdapter>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default ProvidersContainer;
