// app/dashboard/page.tsx
"use client";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">Dashboard</h1>
      <p>Welcome, {session?.user?.name || "User"}</p>
      <p>Subscription: {session?.user?.role || "FREE"}</p>
      <p>KYC Verified: {session?.user?.verified ? "Yes" : "No"}</p>
      {/* My Listings, Bookings etc can go here */}
    </div>
  );
}
