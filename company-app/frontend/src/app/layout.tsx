import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Tanuri Company App",
	description:
		"A web app to help fulfil orders made via the Tanuri Consumer App.",
};




interface RootLayoutProps extends Readonly<{ children: ReactNode }> {}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
};

export default RootLayout;
