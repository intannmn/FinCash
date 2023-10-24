import Image from "next/image";
import Link from "next/link";
import Profile from "./Profile";
import FinCash from "@/assets/logo/FinCash.svg";

export default function Navbar() {
  return (
    <nav className="fixed left-0 z-50 h-screen w-72">
      <div className="absolute -z-10 h-full w-full bg-gradient-to-b from-myGreenA/80 to-white/50 bg-cover bg-fixed bg-no-repeat" />
      <div className="absolute -z-[11] h-full w-full bg-dots-background bg-cover bg-fixed bg-no-repeat" />
      <div className="flex h-full w-full flex-col bg-black/20">
        <section>
          <Image src={FinCash} alt="FinCash" width={250} className="mx-auto my-14" />
        </section>
        <section className="h-full w-full p-5">
          <h1 className="text-llg font-bold">MANU</h1>
          <div className="ml-5 text-lg font-semibold">
            <Link href={"/dashboard"} className="block hover:text-myGreenC">
              + Dashboard
            </Link>
            <Link href={"/expence"} className="block hover:text-myGreenC">
              + Expence
            </Link>
            <Link href={"/income"} className="block hover:text-myGreenC">
              + Income
            </Link>
            <Link href={"/report"} className="block hover:text-myGreenC">
              + Report
            </Link>
          </div>
        </section>
        <Profile />
      </div>
    </nav>
  );
}
