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
  const [category, setCategory] = useState("Monthly");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState(null);

  useEffect(() => {
    fetch("https://653a4d94e3b530c8d9e976d9.mockapi.io/expense")
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error("Error fetching data: " + error));
  }, []);

  const addExpense = (e) => {
    e.preventDefault();
    setLoading(true);
    const newExpense = {
      date: date,
      rp: rp,
      category: category,
      note: note,
    };

    if (editMode) {
      fetch(`https://653a4d94e3b530c8d9e976d9.mockapi.io/expense/${editExpenseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense),
      })
        .then(() => {
          const updatedExpenses = expenses.map((expense) => {
            if (expense.id === editExpenseId) {
              return { ...expense, ...newExpense };
            }
            return expense;
          });
          setExpenses(updatedExpenses);
          setLoading(false);
          setEditMode(false);
          setEditExpenseId(null);
          setDate("");
          setRp("");
          setCategory("Monthly");
          setNote("");
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error updating expense: " + error);
        });
    } else {
      fetch("https://653a4d94e3b530c8d9e976d9.mockapi.io/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense),
      })
        .then((response) => response.json())
        .then((data) => {
          setExpenses([...expenses, data]);
          setLoading(false);
          setDate("");
          setRp("");
          setCategory("Monthly");
          setNote("");
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error adding expense: " + error);
        });
    }
  };

  const handleEditExpense = (expense) => {
    setEditMode(true);
    setEditExpenseId(expense.id);
    setDate(expense.date);
    setRp(expense.rp);
    setCategory(expense.category);
    setNote(expense.note);
  };

  const handleDeleteExpense = (expenseId) => {
    fetch(`https://653a4d94e3b530c8d9e976d9.mockapi.io/expense/${expenseId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedExpenses = expenses.filter((expense) => expense.id !== expenseId);
        setExpenses(updatedExpenses);
      })
      .catch((error) => {
        console.error("Error deleting expense: " + error);
      });
  };

  return (
    <main className="space-y-5">
      <form onSubmit={addExpense} className="space-y-3">
        <InputDate label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
        <InputNumber label="Rp" value={rp} onChange={(e) => setRp(e.target.value)} />
        <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Monthly">Monthly</option>
          <option value="Utility">Utility</option>
          <option value="Life Style">Life Style</option>
          <option value="Other">Other</option>
        </Select>
        <TextArea label="Note" value={note} onChange={(e) => setNote(e.target.value)} />
        <SubmitButton label={editMode ? "Save" : "Submit"} font="semibold" size="md" loading={loading} />
      </form>

      <div className="rounded-md border-2 border-black">
        <table className="w-full border-collapse divide-y-2 divide-black rounded-md">
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
            {expenses.map((expense, index) => (
              <tr key={expense.id} className="divide-x-2 divide-black text-center">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{expense.date}</td>
                <td className="p-3">{expense.rp}</td>
                <td className="p-3">{expense.category}</td>
                <td className="p-3">{expense.note}</td>
                <td className="p-3">
                  <div className="flex items-center justify-center">
                    <button onClick={() => handleEditExpense(expense)} className="mr-2 rounded-md bg-A3 px-4 py-2 text-white hover:bg-A4">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteExpense(expense.id)} className="rounded-md bg-C2 px-4 py-2 text-white hover:bg-C3">
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
