import { Cloud } from "lucide-react";
import Link from "next/link";

export default function Home(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <main className="flex-1">
        <section className="w-full py-16 md:py-24 lg:py-32">
          {props.children}
        </section>
      </main>
      <footer className="border-t border-gray-800 bg-gray-950/50">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-gray-100" />
            <span className="text-sm font-semibold text-gray-100">
              Simple Drive
            </span>
          </div>
          <p className="text-xs text-gray-400">
            © 2025 Simple Drive. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-xs text-gray-400 hover:text-gray-100"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-xs text-gray-400 hover:text-gray-100"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-xs text-gray-400 hover:text-gray-100"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
