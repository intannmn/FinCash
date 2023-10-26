"use client";

import { useState } from "react";
import InputDate from "@/components/inputs/InputDate";
import InputNumber from "@/components/inputs/InputNumber";
import TextArea from "@/components/inputs/TextArea";
import Select from "@/components/inputs/Select";
import Image from "next/image";

export default function Main() {
  const [date, setDate] = useState("");
  const [rp, setRp] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <main className="px-5">
      <form className="space-y-3">
        <InputDate label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
        <InputNumber label="Rp" value={rp} onChange={(e) => setRp(e.target.value)} />
        <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Salary">Monthly</option>
          <option value="Bonus">Utility</option>
          <option value="Investment">Life Style</option>
          <option value="Other">Other</option>
        </Select>
        <TextArea label="Note" value={note} onChange={(e) => setNote(e.target.value)} />
        <button
          type="submit"
          disabled={loading}
          className={`flex h-10 w-24 items-center justify-center gap-1 rounded-md font-bold text-white ${
            loading ? "cursor-wait bg-myGreenD/60" : "bg-myGreenD/70 hover:bg-myGreenD/80"
          }`}
        >
          <span>Submit</span>
          {loading && <Image src={require("@/assets/loading/Loading-Black.svg")} alt="Loading" width={20} height={0} quality={50} loading="eager" />}
        </button>
      </form>
    </main>
  );
}
