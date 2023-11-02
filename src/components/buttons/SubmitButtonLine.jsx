import Image from "next/image";
import loadingAnimation from "@/assets/loading/Loading-Black.svg";

export default function SubmitButtonLine({ label, font, size, loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`flex items-center justify-center gap-1 border-2 ${font === "semibold" && "font-semibold"} ${font === "bold" && "font-bold"} ${
        size === "sm" && "rounded-sm px-3 py-1"
      } ${size === "sm-full" && "w-full rounded-sm py-1"} ${size === "md" && "rounded-md px-6 py-2"} ${
        size === "md-full" && "w-full rounded-md py-2"
      }  ${size === "lg" && "rounded-md px-12 py-3"} ${size === "lg-full" && "w-full rounded-md py-3"} ${
        loading
          ? "cursor-wait border-[#ECC10C]/60 bg-[#ECC10C]/60"
          : "border-[#ECC10C] text-[#ECC10C] hover:border-[#ECC10C]/80 hover:bg-[#ECC10C]/80 hover:text-black"
      }`}
    >
      <span>{label}</span>
      {loading && <Image src={loadingAnimation} alt="Loading..." width={20} height={0} quality={50} loading="eager" className="stroke-black" />}
    </button>
  );
}
