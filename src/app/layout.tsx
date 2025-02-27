import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { PostHogProvider } from "~/app/_providers/posthog-provider";

export const metadata: Metadata = {
  title: "Drive clone",
  description: "My drive clone",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <PostHogProvider>{children}</PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
