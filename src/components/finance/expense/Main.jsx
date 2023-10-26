"use client";

import SubmitButton from "@/components/buttons/SubmitButton";
import InputDate from "@/components/inputs/InputDate";
import InputNumber from "@/components/inputs/InputNumber";
import Select from "@/components/inputs/Select";
import TextArea from "@/components/inputs/TextArea";
import { useState } from "react";

export default function Main() {
  const [date, setDate] = useState("");
  const [rp, setRp] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <main>
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
        <SubmitButton label={"Submit"} font={"semibold"} size={"md"} loading={loading} />
      </form>
    </main>
  );
}
