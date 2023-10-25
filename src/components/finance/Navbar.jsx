"use client";

import FinCash from "@/assets/logo/FinCash.svg";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { RiDashboardFill, RiShutDownLine } from "react-icons/ri";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  console.log(pathname);
  const session = useSession();
  const user = session.data?.user;
  return (
    <nav className="fixed left-0 z-50 flex h-screen w-72 flex-col border-r-2 border-black bg-white">
      <section className="border-b-2 border-black">
        <Image src={FinCash} alt="FinCash" width={250} className="mx-auto my-14" />
      </section>
      <section className="h-full w-full p-5">
        <h1 className="text-2xl font-bold">MENU</h1>
        <div className="ml-5 mt-4 space-y-4 text-lg font-semibold">
          <Link href="/dashboard" className={`flex items-center gap-2 ${pathname === "/dashboard" ? "text-myGreenC" : "hover:text-myGreenC"}`}>
            <RiDashboardFill size={20} /> Dashboard
          </Link>
          <Link href="/expence" className={`flex items-center gap-2 ${pathname === "/expence" ? "text-myGreenC" : "hover:text-myGreenC"}`}>
            <GiPayMoney size={20} /> Expense
          </Link>
          <Link href="/income" className={`flex items-center gap-2 ${pathname === "/income" ? "text-myGreenC" : "hover:text-myGreenC"}`}>
            <GiReceiveMoney size={20} /> Income
          </Link>
          <Link href="/report" className={`flex items-center gap-2 ${pathname === "/report" ? "text-myGreenC" : "hover:text-myGreenC"}`}>
            <FaMoneyBillTransfer size={20} /> Report
          </Link>
        </div>
      </section>
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
    </nav>
  );
}
