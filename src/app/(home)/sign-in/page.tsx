import { SignInButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-[55vh]">
      <div className="flex w-full items-center justify-center">
        <SignInButton mode="modal" fallbackRedirectUrl={"/drive"}>
          <Button className="h-12 bg-gray-100 px-8 text-base text-gray-900 hover:bg-gray-200">
            Sign-in
          </Button>
        </SignInButton>
      </div>
    </div>
  );
}
