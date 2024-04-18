import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "./_components/topnav";

import { ruRU } from "@clerk/localizations";
import Image from "next/image";
import { Toaster } from "~/components/ui/toaster";

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
      <ViewTransitions>
        <html lang="en">
          <body
            className={`font-sans ${inter.variable} min-h-screen flex flex-col m-0 bg-background`}
          >
            <TRPCReactProvider>
              <TopNav />
              <main className="z-10 flex-1">{children}</main>
              <Image
                src="/bg-image.png"
                alt="Background image"
                width={1000}
                height={1000}
                className="fixed top-0 left-0 right-0 bottom-0 min-h-screen w-full"
                style={{ objectFit: "cover", position: 'fixed' }}
              />
              <Toaster />
            </TRPCReactProvider>
          </body>
        </html>
      </ViewTransitions>
    </ClerkProvider>
  );
}
