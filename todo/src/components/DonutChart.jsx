import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const DonutChart = () => {
  const data = {
    labels: ["Completed", "Delayed", "In progress", "Waiting on customer"],
    datasets: [
      {
        data: [11, 22, 44, 22], // Percentage values for each category
        backgroundColor: ["#4285F4", "#F4B400", "#DB4437", "#0F9D58"],
        hoverBackgroundColor: ["#5A9EF4", "#F6C54D", "#E05A4B", "#23B36A"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="max-w-md mx-auto p-4 rounded-lg ">
      <h2 className="text-center text-xl font-semibold mb-4">Task Progress</h2>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;