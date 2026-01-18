import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { AuthNav } from "@/components/AuthNav";

export const metadata: Metadata = {
  title: {
    default: "Blog Reference",
    template: "%s | Blog Reference",
  },
  description: "Referencyjny system blogowy zbudowany w Next.js (App Router).",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="pl">
      <body className="min-h-screen bg-background text-foreground">
        <header className="border-b">
          <nav className="mx-auto flex max-w-5xl items-center gap-6 p-4">
            <Link href="/" className="font-semibold">
              Home
            </Link>

            <Link
              href="/posts"
              className="text-muted-foreground hover:text-foreground"
            >
              Posts
            </Link>
            <AuthNav />
          </nav>
        </header>

        <main className="mx-auto max-w-5xl p-6">{children}</main>
      </body>
    </html>
  );
}
