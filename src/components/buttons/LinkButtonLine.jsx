import Link from "next/link";

export default function LinkButtonLine({ label, href, font, size }) {
  return (
    <Link href={href}>
      <button
        type="button"
        className={`border-A2 hover:bg-A4 text-A2 hover:border-A4 flex items-center justify-center gap-1 rounded-md border-2 hover:text-black ${
          font === "semibold" && "font-semibold"
        } ${font === "bold" && "font-bold"} ${size === "sm" && "rounded-sm px-3 py-1"} ${size === "sm-full" && "w-full rounded-sm py-1"} ${
          size === "md" && "rounded-md px-6 py-2"
        } ${size === "md-full" && "w-full rounded-md py-2"}  ${size === "lg" && "rounded-md px-12 py-3"} ${
          size === "lg-full" && "w-full rounded-md py-3"
        }`}
      >
        <span>{label}</span>
      </button>
    </Link>
  );
}
