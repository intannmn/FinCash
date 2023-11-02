export default function Button({ label, font, size, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-1 rounded-md bg-[#ECC10C] hover:bg-[#ECC10C]/80 ${font === "semibold" && "font-semibold"} ${
        font === "bold" && "font-bold"
      } ${size === "sm" && "rounded-sm px-3 py-1"} ${size === "sm-full" && "w-full rounded-sm py-1"} ${size === "md" && "rounded-md px-6 py-2"} ${
        size === "md-full" && "w-full rounded-md py-2"
      }  ${size === "lg" && "rounded-md px-12 py-3"} ${size === "lg-full" && "w-full rounded-md py-3"}`}
    >
      <span>{label}</span>
    </button>
  );
}
