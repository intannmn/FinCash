"use client";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export default function Main() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [exportExcel, setExportExcel] = useState([]);
  const [exportIncomes, setexportIncomes] = useState([]);
  const [exportExpenses, setexportExpenses] = useState([]);

  useEffect(() => {
    fetch("https://653a4d94e3b530c8d9e976d9.mockapi.io/expense")
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error("Error fetching expense data: " + error));

    fetch("https://653a4d94e3b530c8d9e976d9.mockapi.io/income")
      .then((response) => response.json())
      .then((data) => {
        setIncomes(data);
        const total = data.reduce((acc, income) => acc + parseInt(income.rp), 0);
        setTotalIncome(total);
      })
      .catch((error) => console.error("Error fetching income data: " + error));
  }, []);

  useEffect(() => {
    const total = expenses.reduce((acc, expense) => acc + parseInt(expense.rp), 0);
    setTotalExpense(total);
  }, [expenses]);

  useEffect(() => {
    const newBalance = totalIncome - totalExpense;
    setBalance(newBalance);
    setexportIncomes(incomes.map((income, index) => [index + 1, income.date, income.rp, income.category, income.note]));
    setexportExpenses(expenses.map((expense, index) => [index + 1, expense.date, expense.rp, expense.category, expense.note]));
    setExportExcel([[totalIncome, totalExpense, balance], ...exportIncomes, ...exportExpenses]);

    console.log(exportExcel);
  }, [incomes, expenses]);

  const handleExcelExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([["Total Income", "Total Expense", "Balance"]]);
    XLSX.utils.sheet_add_json(ws, exportExcel, { skipHeader: true, origin: -1 });
    XLSX.utils.book_append_sheet(wb, ws, "Fincash Report");
    XLSX.writeFile(wb, "Fincash_Report.xlsx");
  };

  return (
    <main className="space-y-5">
      <section id="totalTable">
        <div className="rounded-md border-2 border-black">
          <table className="w-full divide-y-2 divide-black">
            <thead>
              <tr className="divide-x-2 divide-black font-bold">
                <th className="p-3">INCOME</th>
                <th className="p-3">EXPENSE</th>
                <th className="p-3">BALANCE</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x-2 divide-black text-center">
                <td className="p-3">Rp {totalIncome}</td>
                <td className="p-3">Rp {totalExpense}</td>
                <td className="p-3">Rp {balance}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button type="button" onClick={handleExcelExport}>
          Excel
        </button>
      </section>

      <section className="flex items-center justify-center">
        <div id="incomeTable" className="grid w-full grid-cols-2 gap-5">
          <div className="rounded-md border-2 border-black">
            <table className="w-full divide-y-2 divide-black">
              <thead>
                <tr className="divide-x-2 divide-black font-bold">
                  <th className="p-3">NO</th>
                  <th className="p-3">DATE</th>
                  <th className="p-3">RP</th>
                  <th className="p-3">CATEGORY</th>
                  <th className="p-3">NOTE</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div id="expenseTable" className="rounded-md border-2 border-black">
            <table className="w-full border-collapse divide-y-2 divide-black">
              <thead>
                <tr className="divide-x-2 divide-black font-bold">
                  <th className="p-3">NO</th>
                  <th className="p-3">DATE</th>
                  <th className="p-3">RP</th>
                  <th className="p-3">CATEGORY</th>
                  <th className="p-3">NOTE</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={expense.id} className="divide-x-2 divide-black text-center">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{expense.date}</td>
                    <td className="p-3">Rp {expense.rp}</td>
                    <td className="p-3">{expense.category}</td>
                    <td className="p-3">{expense.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
