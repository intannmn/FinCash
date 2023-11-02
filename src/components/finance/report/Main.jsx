"use client";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Button from "@/components/buttons/Button";

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
      .then((data) => {
        setExpenses(data);
        const total = data.reduce((acc, expense) => acc + parseInt(expense.rp), 0);
        setTotalExpense(total);
      })
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
    const newBalance = totalIncome - totalExpense;
    setBalance(newBalance);

    setexportIncomes(incomes.map((income, index) => [index + 1, income.date, income.rp, income.category, income.note]));
    setexportExpenses(expenses.map((expense, index) => [index + 1, expense.date, expense.rp, expense.category, expense.note]));
    setExportExcel([[totalIncome, totalExpense, balance], ...exportIncomes, ...exportExpenses]);
  }, [incomes, expenses]);

  const handleExcelExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([["Total Income", "Total Expense", "Balance"]]);
    XLSX.utils.sheet_add_json(ws, exportExcel, { skipHeader: true, origin: -1 });
    XLSX.utils.book_append_sheet(wb, ws, "Fincash Report");
    XLSX.writeFile(wb, "Fincash_Report.xlsx");
  };

  const formatToRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <main className="space-y-5">
      <section id="totalTable">
        <div className="rounded-md border-2 border-[#ECC10C]">
          <table className="w-full divide-y-2 divide-[#ECC10C]">
            <thead>
              <tr className="divide-x-2 divide-[#ECC10C] font-bold">
                <th className="p-3">INCOME</th>
                <th className="p-3">EXPENSE</th>
                <th className="p-3">BALANCE</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-x-2 divide-[#ECC10C] text-center">
                <td className="p-3">{formatToRupiah(totalIncome)}</td>
                <td className="p-3">{formatToRupiah(totalExpense)}</td>
                <td className="p-3">{formatToRupiah(balance)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-center">
          <div id="incomeTable" className="grid w-full grid-cols-2 gap-5">
            <div className="rounded-md border-2 border-[#ECC10C]">
              <table className="w-full divide-y-2 divide-[#ECC10C]">
                <thead>
                  <tr className="divide-x-2 divide-[#ECC10C] font-bold">
                    <th className="p-3">NO</th>
                    <th className="p-3">DATE</th>
                    <th className="p-3">RP</th>
                    <th className="p-3">CATEGORY</th>
                    <th className="p-3">NOTE</th>
                  </tr>
                </thead>
                <tbody>
                  {incomes.map((income, index) => (
                    <tr key={income.id} className="divide-x-2 divide-[#ECC10C] text-center">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{income.date}</td>
                      <td className="p-3">{formatToRupiah(income.rp)}</td>
                      <td className="p-3">{income.category}</td>
                      <td className="p-3">{income.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div id="expenseTable" className="rounded-md border-2 border-[#ECC10C]">
              <table className="w-full border-collapse divide-y-2 divide-[#ECC10C]">
                <thead>
                  <tr className="divide-x-2 divide-[#ECC10C] font-bold">
                    <th className="p-3">NO</th>
                    <th className="p-3">DATE</th>
                    <th className="p-3">RP</th>
                    <th className="p-3">CATEGORY</th>
                    <th className="p-3">NOTE</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense, index) => (
                    <tr key={expense.id} className="divide-x-2 divide-[#ECC10C] text-center">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{expense.date}</td>
                      <td className="p-3">{formatToRupiah(expense.rp)}</td>
                      <td className="p-3">{expense.category}</td>
                      <td className="p-3">{expense.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Button label={"Excel"} font={"semibold"} size={"md-full"} onClick={handleExcelExport} />
      </section>
    </main>
  );
}
