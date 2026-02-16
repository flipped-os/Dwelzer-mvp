// components/Header.tsx
"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Dwelzer</h1>
      <nav className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/real-estate">Real Estate</Link>
        <Link href="/marketplace">Marketplace</Link>
        <Link href="/legal">Legal</Link>
        <Link href="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
}
