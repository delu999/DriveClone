import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Cloud, ArrowRight, Lock, Share2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <>
      <SignInButton mode="modal" fallbackRedirectUrl={"/drive"}>
        <Button size="lg" className="bg-white text-black">
          Sign In
        </Button>
      </SignInButton>
    </>
  );
}
