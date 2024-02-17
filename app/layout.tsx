import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { NavBar } from "@/components/navigation/nav-bar";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AutoMoto",
  description: "Sell your car here!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
      <html suppressHydrationWarning lang="en">
        <body suppressHydrationWarning className={inter.className}>
          <NavBar />

          <div className="md:container pt-20  h-full">{children}</div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
