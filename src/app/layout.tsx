import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "./_components/topnav";

import { ruRU} from "@clerk/localizations";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={ruRU}>
      <html lang="en">
        <body className={`font-sans ${inter.variable} grid grid-rows-[auto,1fr] h-screen`}>
          <TRPCReactProvider>
            <TopNav />
            <main className="overflow-y-scroll max-w-screen-2xl xl:mx-auto">
            {children}
            </main>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
