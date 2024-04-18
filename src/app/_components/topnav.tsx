'use client'

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { CircleUserRound } from "lucide-react";
import { Link } from "next-view-transitions";
import { Button } from "~/components/ui/button";

export function TopNav() {
  return (
    <header className="z-10 bg-background/40 backdrop-blur sticky top-0">
      <div className="flex items-center justify-between p-4 px-5 shadow-sm">
        <Link href="/uni" className="text-4xl font-bold">
          Uni<span className="text-primary">Rate</span>
        </Link>
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="link">
                <CircleUserRound size={30} />
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton showName />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
