"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { AiFillSetting } from "react-icons/ai";
import Link from "next/link";

export default function Header() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <header className="fixed left-0 top-0 h-28 w-full p-5">
      <div className="flex h-full w-full items-center justify-between rounded-2xl border-2 border-black bg-white px-5">
        <section className="flex items-center gap-2">
          <Image src={user?.image} alt="Photo Profile" height={50} width={50} className="rounded-full" />
          <div>
            <h2 className="text-lg font-semibold" title={user?.name}>
              {user?.name}
            </h2>
            <p className="text-sm text-gray-500" title={user?.email}>
              {user?.email}
            </p>
          </div>
        </section>
        <Link href={"/account"} className="hover:text-myGreenC">
          <AiFillSetting size={25} />
        </Link>
      </div>
    </header>
  );
}
