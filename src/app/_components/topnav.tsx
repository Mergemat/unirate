import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { CircleUserRound } from "lucide-react";
import { Button } from "~/components/ui/button";

export function TopNav() {
  return (
    <header>
      <div className="flex items-center justify-between p-4 px-5 shadow-sm">
        <h1 className="text-4xl font-bold">
          Uni<span className="text-primary">Rate</span>
        </h1>
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
