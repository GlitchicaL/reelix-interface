"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const actions = [
    { name: "Profile" },
    { name: "Dashboard" },
  ];

  const router = useRouter();

  async function logoutHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) router.push("/login");
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <main className="pt-8 flex flex-col items-center">
      {actions.map((action, index) => (
        <button key={index} className="border-b-1 w-120 p-4 text-left font-bold cursor-pointer opacity-75 hover:opacity-100 hover:bg-blue-500">
          {action.name}
        </button>
      ))}

      <button onClick={(e) => logoutHandler(e)} className="border-b-1 w-120 p-4 text-left font-bold cursor-pointer opacity-75 hover:opacity-100 hover:bg-blue-500">
        Logout
      </button>
    </main>
  );
}