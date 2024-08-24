import React from "react";
import Chart from "react-apexcharts";

const WeightChart = ({ dates, weights }) => {
  const options = {
    chart: {
      type: "line",
      height: 150,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#50B498"],
    },
    xaxis: {
      categories: dates.map((date) => new Date(date).getDate()),
      labels: {
        style: {
          colors: "#9aa0ac",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      show: false,
    },
    markers: {
      size: 5,
      colors: ["#50B498"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + " KG";
      },
      offsetY: -10,
      style: {
        fontSize: "12px",
        colors: ["#50B498"],
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " KG";
        },
      },
    },
    grid: {
      borderColor: "#e7e7e7",
    },
  };

  const series = [
    {
      name: "Weight",
      data: weights,
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Chart options={options} series={series} type="line" height={150} />
    </div>
  );
};

export default WeightChart;
