import "#/mantine/styles";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import ProvidersContainer from "~/components/containers/Providers";

export const metadata: Metadata = {
	title: "Tanuri Company App",
	description:
		"A web app to help fulfil orders made via the Tanuri Consumer App.",
};

interface RootLayoutProps extends Readonly<{ children: ReactNode }> {}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
	return (
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<ProvidersContainer>{children}</ProvidersContainer>
			</body>
		</html>
	);
};

export default RootLayout;
