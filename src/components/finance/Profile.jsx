"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Profile() {
  const session = useSession();
  return (
    <section className="flex h-24 w-full items-center justify-center">
      <div className="flex gap-2">
        <Image src={session.data?.user.image} alt="Photo Profile" height={50} width={50} className="rounded-full" />
        <h2>{session.data?.user.name}</h2>
      </div>
      <button onClick={() => signOut()}>Sign Out</button>
    </section>
  );
}
