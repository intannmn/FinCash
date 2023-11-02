"use client";

import { useEffect, useState } from "react";
import ExpenseDoughnut from "./ExpenseDoughnut";

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }
  return response.json();
}

export default function Main() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const [incomeData, expenseData] = await Promise.all([
          fetchData("https://653a4d94e3b530c8d9e976d9.mockapi.io/income"),
          fetchData("https://653a4d94e3b530c8d9e976d9.mockapi.io/expense"),
        ]);

        const totalIncome = incomeData.reduce((total, income) => total + parseFloat(income.rp), 0);
        const totalExpense = expenseData.reduce((total, expense) => total + parseFloat(expense.rp), 0);

        setTotalIncome(totalIncome);
        setTotalExpense(totalExpense);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAsync();
  }, []);

  const saldo = totalIncome - totalExpense;

  const formatToRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div className="container mx-auto">
      <div className="grid w-full grid-cols-2 gap-5">
        <div className="h-fit w-full p-4">
          <h2 className="mb-2 text-lg font-semibold">Expense Chart</h2>
          <ExpenseDoughnut />
        </div>
        <div className="flex h-full w-full flex-col gap-5">
          <div className="h-full w-full rounded-md bg-[#ECC10C] p-4">
            <h2 className="mb-2 text-lg font-semibold">Total Income</h2>
            <p className="text-2xl font-bold">{formatToRupiah(totalIncome)}</p>
          </div>

          <div className="h-full w-full rounded-md bg-[#ECC10C] p-4">
            <h2 className="mb-2 text-lg font-semibold">Total Expense</h2>
            <p className="text-2xl font-bold">{formatToRupiah(totalExpense)}</p>
          </div>

          <div className="h-full w-full rounded-md bg-[#ECC10C] p-4">
            <h2 className="mb-2 text-lg font-semibold">Saldo</h2>
            <p className="text-2xl font-bold">{formatToRupiah(saldo)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
