"use client";

import React, { useState, useEffect } from "react";
import SubmitButton from "@/components/buttons/SubmitButton";
import InputDate from "@/components/inputs/InputDate";
import InputNumber from "@/components/inputs/InputNumber";
import Select from "@/components/inputs/Select";
import TextArea from "@/components/inputs/TextArea";

export default function Main() {
  const [date, setDate] = useState("");
  const [rp, setRp] = useState("");
  const [category, setCategory] = useState("Salary");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIncomeId, setEditIncomeId] = useState(null);

  useEffect(() => {
    fetch("https://653a4d94e3b530c8d9e976d9.mockapi.io/income")
      .then((response) => response.json())
      .then((data) => setIncomes(data))
      .catch((error) => console.error("Error fetching data: " + error));
  }, []);

  const addIncome = (e) => {
    e.preventDefault();
    setLoading(true);
    const newIncome = {
      date: date,
      rp: rp,
      category: category,
      note: note,
    };

    if (editMode) {
      fetch(`https://653a4d94e3b530c8d9e976d9.mockapi.io/income/${editIncomeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIncome),
      })
        .then(() => {
          const updatedIncomes = incomes.map((income) => {
            if (income.id === editIncomeId) {
              return { ...income, ...newIncome };
            }
            return income;
          });
          setIncomes(updatedIncomes);
          setLoading(false);
          setEditMode(false);
          setEditIncomeId(null);
          setDate("");
          setRp("");
          setCategory("Salary");
          setNote("");
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error updating income: " + error);
        });
    } else {
      fetch("https://653a4d94e3b530c8d9e976d9.mockapi.io/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIncome),
      })
        .then((response) => response.json())
        .then((data) => {
          setIncomes([...incomes, data]);
          setLoading(false);
          setDate("");
          setRp("");
          setCategory("Salary");
          setNote("");
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error adding income: " + error);
        });
    }
  };

  const handleEditIncome = (income) => {
    setEditMode(true);
    setEditIncomeId(income.id);
    setDate(income.date);
    setRp(income.rp);
    setCategory(income.category);
    setNote(income.note);
  };

  const handleDeleteIncome = (incomeId) => {
    fetch(`https://653a4d94e3b530c8d9e976d9.mockapi.io/income/${incomeId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedIncomes = incomes.filter((income) => income.id !== incomeId);
        setIncomes(updatedIncomes);
      })
      .catch((error) => {
        console.error("Error deleting income: " + error);
      });
  };

  return (
    <main className="space-y-5">
      <form onSubmit={addIncome} className="space-y-3">
        <InputDate label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
        <InputNumber label="Rp" value={rp} onChange={(e) => setRp(e.target.value)} />
        <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Salary">Salary</option>
          <option value="Bonus">Bonus</option>
          <option value="Investment">Investment</option>
          <option value="Other">Other</option>
        </Select>
        <TextArea label="Note" value={note} onChange={(e) => setNote(e.target.value)} />
        <SubmitButton label={editMode ? "Save" : "Submit"} font="semibold" size="md" loading={loading} />
      </form>

      <div className="rounded-md border-2 border-black">
        <table className="w-full divide-y-2 divide-black">
          <thead>
            <tr className="divide-x-2 divide-black font-bold">
              <th className="p-3">NO</th>
              <th className="p-3">DATE</th>
              <th className="p-3">RP</th>
              <th className="p-3">CATEGORY</th>
              <th className="p-3">NOTE</th>
              <th className="p-3">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income, index) => (
              <tr key={income.id} className="divide-x-2 divide-black text-center">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{income.date}</td>
                <td className="p-3">Rp {income.rp}</td>
                <td className="p-3">{income.category}</td>
                <td className="p-3">{income.note}</td>
                <td className="p-3">
                  <div className="flex items-center justify-center">
                    <button onClick={() => handleEditIncome(income)} className="mr-2 rounded-md bg-A3 px-4 py-2 text-white hover:bg-A4">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteIncome(income.id)} className="rounded-md bg-C2 px-4 py-2 text-white hover:bg-C3">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
