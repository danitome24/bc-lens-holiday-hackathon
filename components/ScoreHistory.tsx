import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const ScoreHistory = () => {
  // Datos de ejemplo para los últimos 5 meses
  const months = ["Aug", "Sep", "Oct", "Nov", "Dec"]; // Nombres de los meses
  const scores =  [120, 135, 150, 170, 180]; // Datos de puntajes

  // Configuración de datos para Chart.js
  const data = {
    labels: months,
    datasets: [
      {
        label: `Daniel's Score History`,
        data: scores,
        fill: false,
        backgroundColor: "#10B981",
        borderColor: "#10B981",
        borderWidth: 2,
        pointBackgroundColor: "#10B981",
        tension: 0.3, // Hace la línea más suave
      },
    ],
  };

  // Configuración de opciones para el gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `Score: ${context.raw}`, // Muestra el puntaje en el tooltip
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
          color: "#333",
          font: {
            size: 14,
          },
        },
        grid: {
          display: false, // Oculta las líneas de la grilla vertical
        },
      },
      y: {
        title: {
          display: true,
          text: "Score",
          color: "#333",
          font: {
            size: 14,
          },
        },
        ticks: {
          beginAtZero: true, // Comienza desde 0
          callback: (value) => value, // Add a callback to match the expected type
        },
        grid: {
          color: "#e5e7eb", // Color de la grilla horizontal
        },
      },
    },
  };

  return (
    <div className="my-5 bg-white shadow-md rounded-md w-full h-full flex flex-col ">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        History Score
      </h2>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
