import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FABRA - Craft your career, your way",
  description:
    "An AI-guided workspace to analyze your CV, shape it for each opportunity, and turn everyday work into career momentum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
