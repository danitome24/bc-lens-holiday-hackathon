import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { legend } from "motion/react-client";

interface ScoreGaugeProps {
  score: number; // Valor entre 0 y 100
}

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const ScoreGauge = ({ score }: ScoreGaugeProps) => {
  const data = {
    labels: ["Gauge"],
    datasets: [
      {
        label: "Gauge",
        data: [40, 60], // 70 es el valor, 30 es el borde
        backgroundColor: ["#4caf50", "#e0e0e0"], // Colores para el medidor y el borde
        borderWidth: [8, 8], // Ancho del borde
        circumference: 300, // Mostrar solo la mitad del círculo
        rotation: 210, // Rotación para que empiece desde la parte inferior
        cutout: "80%", // Tamaño del agujero en el centro
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Ocultar leyenda
      },
      tooltip: {
        enabled: false, // Desactivar tooltips
      },
    },
    animation: {
      animateRotate: true, // Animación al cargar
      duration: 1000, // Duración de la animación
    },
    elements: {
      arc: {
        backgroundColor: "#4caf50", // Color de fondo
        borderColor: "#ffffff", // Color del borde del segmento
        borderWidth: 2, // Grosor del borde
        shadowColor: "#000000", // Sombra en el borde
        shadowBlur: 10, // Difusión de la sombra
      },
    },
    cutoutPercentage: 80, // Espacio del agujero central
    layout: {
      padding: 10, // Padding alrededor del gráfico
    },
  };

  return (
    <div className="flex flex-col w-full bg-white text-gray-800">
      {/* SVG Container */}
      <div style={{ width: "200px", height: "200px", margin: "auto" }}>
        <Doughnut data={data} options={options} />
      </div>
      <div className=" w-full h-full flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-800">{score}</span>
        <span className="text-sm text-gray-500">Out of 100</span>
      </div>
    </div>
  );
};
