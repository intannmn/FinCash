import Image from "next/image";
import Link from "next/link";
import FinCash from "@/assets/logo/Logo.svg";

export default function Header() {
  return (
    <header>
      <nav className="flex h-14 w-full items-center justify-between px-5">
        <div className="w-20">
          <Image src={FinCash} alt="FinCash" height={35} width={25} />
        </div>
        <ul className="flex items-center justify-start gap-8">
          <li className="font-semibold hover:text-myGreenD">
            <a href="#Home">Home</a>
          </li>
          <li className="font-semibold hover:text-myGreenD">
            <a href="#About">About</a>
          </li>
          <li className="font-semibold hover:text-myGreenD">
            <a href="#Contact">Contact</a>
          </li>
        </ul>
        <Link
          href={"/login"}
          className="flex h-8 w-20 items-center justify-center border-2 border-myGreenD font-semibold text-myGreenD hover:bg-myGreenD hover:text-white"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
