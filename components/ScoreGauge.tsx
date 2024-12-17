import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

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
        data: [score, 100 - score], // Aquí usas el valor real para el score
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
  };

  return (
    <div className="flex flex-col w-full text-gray-800">
      {/* SVG Container */}
      <div
        style={{
          position: "relative",
          width: "200px",
          height: "200px",
          margin: "auto",
        }}
      >
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-800">{score}</span>
        </div>
      </div>
    </div>
  );
};
