export default function InputText({ label, value, onChange }) {
  return (
    <fieldset className="group w-full rounded-md border-2 border-[#ECC10C] px-3 pb-2 focus-within:border-[#0c661a]">
      <legend className="px-2 font-semibold  group-focus-within:text-[#0c661a]">{label}</legend>
      <input type="text" id={label} value={value} onChange={onChange} className="w-full rounded-md bg-transparent px-2 outline-none" />
    </fieldset>
  );
}
