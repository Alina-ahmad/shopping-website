"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UserData = {
  id: string;
  email: string;
  username: string;
};

export default function AccountPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/users");

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [router]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!user) {
    return null; // already redirecting
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      <p><span className="font-semibold">Username:</span> {user.username}</p>
      <p><span className="font-semibold">Email:</span> {user.email}</p>
    </div>
  );
}