"use client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type React from "react";
import { theme } from "@/styles/mantine-theme";

interface ProviderContainerProps {
  children: React.ReactNode;
}

const ProvidersContainer: React.FC<ProviderContainerProps> = ({ children }) => {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      {children}
    </MantineProvider>
  );
};

export default ProvidersContainer;
