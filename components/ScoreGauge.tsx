"use client";
/* eslint-disable */
import React, { useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ScriptableContext,
} from "chart.js";

interface ScoreGaugeProps {
  score: number; // Value between 0 - 100
}

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const ScoreGauge = ({ score }: ScoreGaugeProps) => {
  const chartRef = useRef<any>(null);

  const createGradient = (ctx: CanvasRenderingContext2D, chartArea: any) => {
    const gradient = ctx.createLinearGradient(
      chartArea.left,
      chartArea.top,
      chartArea.right,
      chartArea.bottom
    );
    gradient.addColorStop(0, "#9beb9e");
    gradient.addColorStop(1, "#2e7d32");
    return gradient;
  };

  const data = {
    labels: ["Score", "Remaining"],
    datasets: [
      {
        label: "Gauge",
        data: [score, 100 - score],
        backgroundColor: (context: ScriptableContext<"doughnut">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return "#e0e0e0";

          return context.dataIndex === 0
            ? createGradient(ctx, chartArea)
            : "#e0e0e0";
        },
        borderWidth: 2,
        circumference: 300,
        rotation: 210,
        cutout: "65%",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    animation: {
      animateRotate: true,
      duration: 1000,
    },
  };

  return (
    <div className="flex flex-col w-full text-base-content">
      <div
        style={{
          position: "relative",
          width: "200px",
          height: "200px",
          margin: "auto",
        }}
      >

        <Doughnut ref={chartRef} data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-white">{score}</span>
        </div>
      </div>
    </div>
  );
};
