export default function InputPassword({ label, value, onChange }) {
  return (
    <fieldset className="border-2 border-black group focus-within:border-myGreenD rounded-md px-3 pb-2 w-full">
      <legend className="group-focus-within:text-myGreenD px-2 font-semibold">{label}</legend>
      <input
        type="password"
        id={label}
        value={value}
        onChange={onChange}
        className="bg-transparent rounded-md px-2 outline-none w-full"
      />
    </fieldset>
  );
}
