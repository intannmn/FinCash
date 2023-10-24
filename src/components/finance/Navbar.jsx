import FinCash from "@/assets/logo/FinCash.svg";
import Image from "next/image";
import Link from "next/link";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { RiDashboardFill } from "react-icons/ri";
import Profile from "./Profile";

export default function Navbar() {
  return (
    <nav className="fixed left-0 z-50 flex h-screen w-72 flex-col border-r-2 border-black bg-white">
      <section className="border-b-2 border-black">
        <Image src={FinCash} alt="FinCash" width={250} className="mx-auto my-14" />
      </section>
      <section className="h-full w-full p-5">
        <h1 className="text-2xl font-bold">MANU</h1>
        <div className="mt-4 space-y-4">
          <Link href="/dashboard" className="flex items-center gap-2 hover:text-myGreenC">
            <RiDashboardFill size={20} /> Dashboard
          </Link>
          <Link href="/expence" className="flex items-center gap-2 hover:text-myGreenC">
            <GiPayMoney size={20} /> Expense
          </Link>
          <Link href="/income" className="flex items-center gap-2 hover:text-myGreenC">
            <GiReceiveMoney size={20} /> Income
          </Link>
          <Link href="/report" className="flex items-center gap-2 hover:text-myGreenC">
            <FaMoneyBillTransfer size={20} /> Report
          </Link>
        </div>
      </section>
      <Profile />
    </nav>
  );
}
