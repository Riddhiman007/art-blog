import "./globals.css";
import { Metadata } from "next";

import { Footer, Navbar } from "./components";
import Providers from "./context";

export const metadata: Metadata = {
  title: "Kalaspandan",
  description: "The best ever art website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <body className="bg-slate-100 dark:bg-slate-950">
          <Navbar />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
