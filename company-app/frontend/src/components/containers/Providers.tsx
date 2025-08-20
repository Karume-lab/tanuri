"use client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type React from "react";
import { theme } from "#/mantine/theme";

interface ProviderProps {
	children: React.ReactNode;
}

const ProvidersContainer: React.FC<ProviderProps> = ({ children }) => {
	return (
		<MantineProvider theme={theme}>
			<Notifications />
			{children}
		</MantineProvider>
	);
};

export default ProvidersContainer;
