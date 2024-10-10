// ChartComponent.tsx
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

const ChartComponent: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    if (ctx) {
      const chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Community Rewards', 'Team', 'Development', 'Marketing'],
          datasets: [
            {
              label: 'Token Allocation (%)',
              data: [50, 20, 15, 15],
              backgroundColor: [
                'rgba(249, 199, 79, 0.8)',
                'rgba(67, 170, 139, 0.8)',
                'rgba(87, 117, 144, 0.8)',
                'rgba(243, 114, 44, 0.8)',
              ],
              borderColor: 'rgba(255, 255, 255, 0.6)',
              borderWidth: 2,
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return context.label + ': ' + context.raw + '%';
                },
              },
            },
            datalabels: {
              formatter: (value, context) => {
                const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return percentage + '%';
              },
              color: '#fff',
              font: {
                weight: 'bold',
                size: 16,
              },
            },
          },
        },
      });

      return () => {
        chart.destroy(); // Cleanup chart instance on unmount
      };
    }
  }, []);

  return (
    <div className="bg-gray-700 h-72 rounded-lg p-4">
      <canvas ref={chartRef} height="400" />
    </div>
  );
};

export default ChartComponent;
