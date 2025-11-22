import type { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live";

import "../globals.css";

export const metadata: Metadata = {
  title: "Salvador Academy",
  description: "Ontario-focused learning platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
      <SanityLive />
    </html>
  );
}
