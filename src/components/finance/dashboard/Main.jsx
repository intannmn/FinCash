export default async function Main() {
  try {
    const [incomeResponse, expenseResponse] = await Promise.all([
      fetch("https://653a4d94e3b530c8d9e976d9.mockapi.io/income"),
      fetch("https://653a4d94e3b530c8d9e976d9.mockapi.io/expense"),
    ]);

    if (!incomeResponse.ok || !expenseResponse.ok) {
      throw new Error("Failed to fetch data.");
    }

    const [incomes, expenses] = await Promise.all([incomeResponse.json(), expenseResponse.json()]);

    const totalIncome = incomes.reduce((total, income) => total + parseFloat(income.rp), 0);
    const totalExpense = expenses.reduce((total, expense) => total + parseFloat(expense.rp), 0);
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
      <div className="container mx-auto p-4">
        <div className="flex w-full gap-5">
          <div className="mb-4 w-full rounded-md bg-white p-4">
            <h2 className="mb-2 text-lg font-semibold">Total Income</h2>
            <p className="text-2xl font-bold">{formatToRupiah(totalIncome)}</p>
          </div>

          <div className="mb-4 w-full rounded-md bg-white p-4">
            <h2 className="mb-2 text-lg font-semibold">Total Expense</h2>
            <p className="text-2xl font-bold">{formatToRupiah(totalExpense)}</p>
          </div>
        </div>

        <div className="mb-4 rounded-md bg-white p-4">
          <h2 className="mb-2 text-lg font-semibold">Saldo</h2>
          <p className="text-2xl font-bold">{formatToRupiah(saldo)}</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error: " + error);
  }
}
