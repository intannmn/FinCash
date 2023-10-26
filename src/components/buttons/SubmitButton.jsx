import Image from "next/image";
import loadingAnimation from "@/assets/loading/Loading-Black.svg";

export default function SubmitButton({ label, font, size, loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`flex items-center justify-center gap-1 rounded-md ${font === "semibold" && "font-semibold"} ${font === "bold" && "font-bold"} ${
        size === "sm" && "px-3 py-1 rounded-sm"
      } ${size === "sm-full" && "w-full py-1 rounded-sm"} ${size === "md" && "px-6 py-2 rounded-md"} ${size === "md-full" && "w-full py-2 rounded-md"}  ${
        size === "lg" && "px-12 py-3 rounded-md"
      } ${size === "lg-full" && "w-full py-3 rounded-md"} ${loading ? "bg-A5 cursor-wait" : "bg-A3 hover:bg-A4"}`}
    >
      <span>{label}</span>
      {loading && <Image src={loadingAnimation} alt="Loading..." width={20} height={0} quality={50} loading="eager" className="stroke-black" />}
    </button>
  );
}
