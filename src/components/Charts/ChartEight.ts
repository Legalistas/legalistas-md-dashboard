import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

// Función para procesar los datos
const processData = (data) => {
  const channelMap = {};

  data.forEach((item) => {
    if (!channelMap[item.channel]) {
      channelMap[item.channel] = 0;
    }
    channelMap[item.channel] += parseInt(item.wonOpportunities, 10);
  });

  const labels = Object.keys(channelMap);
  const series = Object.values(channelMap);

  return { labels, series };
};

const ChartEight: React.FC = () => {
  const [state, setState] = useState({
    series: [],
    labels: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.legalistas.com.ar/v1/statistics/crm?sourceChannel=all"
        );
        const data = await response.json();
        const { labels, series } = processData(data);
        setState({ labels, series });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    colors: [
      "#0FADCF",
      "#80CAEE",
      "#3C50E0",
      "#00E396",
      "#FEB019",
      "#FF4560",
      "#775DD0",
    ],
    labels: state.labels,
    legend: {
      show: false,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 250,
          },
        },
      },
    ],
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-title-sm2 font-bold text-black dark:text-white">
            Oportunidades Ganadas por Canal
          </h4>
        </div>
        <div className="mt-2 flex items-center sm:mt-0">
          <p className="font-medium uppercase text-black dark:text-white">
            Short by:
          </p>
          <div className="relative z-20 inline-block">
            <select
              name="#"
              id="#"
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 font-medium outline-none"
            >
              <option value="" className="dark:bg-boxdark">
                Monthly
              </option>
              <option value="" className="dark:bg-boxdark">
                Weekly
              </option>
            </select>
            <span className="absolute right-1 top-1/2 z-10 -translate-y-1/2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.99995 12.8249C8.8312 12.8249 8.69058 12.7687 8.54995 12.6562L2.0812 6.2999C1.82808 6.04678 1.82808 5.65303 2.0812 5.3999C2.33433 5.14678 2.72808 5.14678 2.9812 5.3999L8.99995 11.278L15.0187 5.34365C15.2718 5.09053 15.6656 5.09053 15.9187 5.34365C16.1718 5.59678 16.1718 5.99053 15.9187 6.24365L9.44995 12.5999C9.30933 12.7405 9.1687 12.8249 8.99995 12.8249Z"
                  fill="#64748B"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="mb-2">
        <div id="chartEight" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {state.labels.map((label, index) => (
          <div className="flex items-center justify-between" key={label}>
            <div className="flex items-center gap-2">
              <span
                className="block h-4 w-4 rounded-full"
                style={{ borderColor: options.colors[index] }}
              ></span>
              <span className="font-medium text-black-2 dark:text-white">
                {label}
              </span>
            </div>
            <span className="inline-block rounded-md bg-primary px-1.5 py-0.5 text-xs font-medium text-white">
              {(
                (state.series[index] /
                  state.series.reduce((a, b) => a + b, 0)) *
                100
              ).toFixed(2)}
              %
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartEight;
