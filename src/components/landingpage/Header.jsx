import Image from "next/image";
import FinCash from "@/assets/logo/Logo.svg";
import LinkButtonLine from "../buttons/LinkButtonLine";

export default function Header() {
  return (
    <header>
      <nav className="flex h-14 w-full items-center justify-between px-5">
        <div className="w-20">
          <Image src={FinCash} alt="FinCash" height={35} width={25} />
        </div>
        <ul className="flex items-center justify-start gap-8 text-lg">
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
        <LinkButtonLine label={"Login"} href={"/login"} font={"semibold"} size={"sm"} />
      </nav>
    </header>
  );
}
