"use client";

import FinCash from "@/assets/logo/FinCash.svg";
import Logo from "@/assets/logo/Logo.svg";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { RiDashboardFill, RiShutDownLine } from "react-icons/ri";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed left-0 top-0 h-full px-5 pb-5 pt-28">
      <div className="flex h-full w-64 flex-col items-center rounded-2xl border-2 border-black bg-[#0c661a]">
        <section className="my-8 flex rounded-full bg-white px-6 py-4">
          <Image src={Logo} alt="Logo" width={25} />
          <Image src={FinCash} alt="FinCash" width={150} />
        </section>
        <section className="h-full space-y-4 text-2xl font-semibold">
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 ${pathname === "/dashboard" ? "text-[#ECC10C]" : "text-white hover:text-[#ECC10C]"}`}
          >
            <RiDashboardFill size={30} /> Dashboard
          </Link>
          <Link href="/income" className={`flex items-center gap-2 ${pathname === "/income" ? "text-[#ECC10C]" : "text-white hover:text-[#ECC10C]"}`}>
            <GiReceiveMoney size={30} /> Income
          </Link>
          <Link
            href="/expense"
            className={`flex items-center gap-2 ${pathname === "/expense" ? "text-[#ECC10C]" : "text-white hover:text-[#ECC10C]"}`}
          >
            <GiPayMoney size={30} /> Expense
          </Link>
          <Link href="/report" className={`flex items-center gap-2 ${pathname === "/report" ? "text-[#ECC10C]" : "text-white hover:text-[#ECC10C]"}`}>
            <FaMoneyBillTransfer size={30} /> Report
          </Link>
        </section>
        <section className="my-5">
          <button onClick={() => signOut()} className="flex items-center gap-1 text-xl font-semibold text-white hover:text-red-600">
            <RiShutDownLine size={20} />
            <span>Logout</span>
          </button>
        </section>
      </div>
    </nav>
  );
}
