import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Next JS Good Practices",
  description: "A repo to improve my practices in Next JS",
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
