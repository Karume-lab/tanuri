import "@/styles/global.css";
import "@/styles/mantine-components";

import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ProvidersContainer } from "@/components/containers";

export const metadata: Metadata = {
  title: "Tanuri",
  description: "Purchase gas products like never before!",
};

interface RootLayoutProps extends Readonly<{ children: ReactNode }> {}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="antialiased">
        <ProvidersContainer>{children}</ProvidersContainer>
      </body>
    </html>
  );
};

export default RootLayout;
