"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { RiShutDownLine } from "react-icons/ri";

export default function Profile() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <section className="flex h-24 w-full items-center justify-between border-t-2 border-black px-2">
      <Image src={user?.image} alt="Photo Profile" height={50} width={50} className="rounded-full" />
      <div className="flex flex-col">
        <h2 className="w-[180px] truncate text-lg font-semibold" title={user?.name}>
          {user?.name}
        </h2>
        <p className="w-[180px] truncate text-sm text-gray-500" title={user?.email}>
          {user?.email}
        </p>
      </div>
      <button onClick={() => signOut()} className="text-red-500">
        <RiShutDownLine size={20} />
      </button>
    </section>
  );
}
