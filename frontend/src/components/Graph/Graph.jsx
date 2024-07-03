import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto"; // Import Chart.js library

function Graph() {
  const chartRef = useRef(null);
  const [sellingRates, setSellingRates] = useState([]);

  // Mock data for selling rates (you can replace this with your actual data)
  useEffect(() => {
    // Fetch selling rates data from your API or database
    // For demonstration, let's use mock data
    const mockSellingRates = [
      [20, 30, 40, 50, 60, 70, 80], // Dataset 1
      [15, 25, 35, 45, 55, 65, 75], // Dataset 2
      [10, 20, 30, 40, 50, 60, 70], // Dataset 3
    ];
    setSellingRates(mockSellingRates);
  }, []);

  useEffect(() => {
    if (chartRef.current && sellingRates.length > 0) {
      const ctx = chartRef.current.getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: sellingRates.map((data, index) => ({
            label: `Dataset ${index + 1}`,
            data: data,
            fill: false,
            borderColor: `rgba(${Math.random() * 255}, ${
              Math.random() * 255
            }, ${Math.random() * 255}, 1)`,
            tension: 0.4,
          })),
        },
        options: {
          animation: {
            duration: 2000, // Animation duration in milliseconds
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [sellingRates]);

  return (
    <div>
      <canvas ref={chartRef} width="300" height="150"></canvas>
    </div>
  );
}

export default Graph;
