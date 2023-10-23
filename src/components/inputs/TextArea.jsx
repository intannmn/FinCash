export default function TextArea({ label, value, onChange }) {
  return (
    <fieldset className="group w-full rounded-md border-2 border-black px-3 pb-2 focus-within:border-myGreenD">
      <legend className="px-2 font-semibold group-focus-within:text-myGreenD">{label}</legend>
      <textarea cols="30" rows="10" id={label} value={value} onChange={onChange} className="w-full rounded-md bg-transparent px-2 outline-none" />
    </fieldset>
  );
}
