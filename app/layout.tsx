import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShadCN Wireframer",
  description: "Drag and drop wireframing tool for ShadCN components",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
