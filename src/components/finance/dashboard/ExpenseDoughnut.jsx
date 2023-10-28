"use client";

import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseDoughnut() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(75, 192, 192, 0.6)"],
      },
    ],
  });

  useEffect(() => {
    fetch("https://653a4d94e3b530c8d9e976d9.mockapi.io/expense")
      .then((response) => response.json())
      .then((data) => {
        const categoryData = {};

        data.forEach((expense) => {
          const category = expense.category;
          const rp = parseFloat(expense.rp);

          if (categoryData[category]) {
            categoryData[category] += rp;
          } else {
            categoryData[category] = rp;
          }
        });

        const labels = Object.keys(categoryData);
        const dataValues = Object.values(categoryData);

        setChartData({
          labels: labels,
          datasets: [
            {
              data: dataValues,
              backgroundColor: chartData.datasets[0].backgroundColor,
            },
          ],
        });
      });
  }, [chartData.datasets]);

  return <Doughnut data={chartData} />;
}

export default ExpenseDoughnut;
