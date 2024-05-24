/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import { roundToTwoDecimal } from "../../../../utils/functions";

interface ISeriesData {
   x: string[] | number[];
   y: number[] | string[];
}

const DonutChart = (chartData: ISeriesData) => {
   const [chart, setChart] = useState<ApexCharts>();
   const [chartOptions, setChartOptions] = useState<Object>({
      series: chartData.y,
      colors: ["#16BDCA", "#FDBA8C", "#FDE68A", "#1C64F2", "#E74694"],
      chart: {
         height: "320px",
         width: "100%",
         type: "donut",
      },
      stroke: {
         colors: ["transparent"],
         lineCap: "",
      },
      plotOptions: {
         pie: {
            donut: {
               labels: {
                  show: true,
                  name: {
                     show: true,
                     fontFamily: "Inter, sans-serif",
                     offsetY: 20,
                  },
                  total: {
                     showAlways: true,
                     show: true,
                     label: "Status",
                     fontFamily: "Inter, sans-serif",
                     formatter: function (w: any) {
                        const sum = w.globals.seriesTotals.reduce(
                           (a: number, b: number) => {
                              return a + b;
                           },
                           0,
                        );
                        return Math.round(sum) + "%";
                     },
                  },
                  value: {
                     show: true,
                     fontFamily: "Inter, sans-serif",
                     offsetY: -20,
                     formatter: function (value: any) {
                        return value + "%";
                     },
                  },
               },
               size: "75%",
            },
         },
      },
      grid: {
         padding: {
            top: -2,
         },
      },
      labels: chartData.x,
      dataLabels: {
         enabled: false,
      },
      legend: {
         position: "bottom",
         fontFamily: "Inter, sans-serif",
      },
      yaxis: {
         labels: {
            formatter: function (value: number) {
               return value + "%";
            },
         },
      },
      xaxis: {
         labels: {
            formatter: function (value: number) {
               return value + "%";
            },
         },
         axisTicks: {
            show: false,
         },
         axisBorder: {
            show: false,
         },
      },
   });

   useEffect(() => {
      setChartOptions({
         ...chartOptions,
         series: chartData.y,
         labels: chartData.x,
      });
   }, [chartData]);

   useEffect(() => {
      const donutChart = document.getElementById("donut-chart");
      if (donutChart && typeof ApexCharts !== "undefined") {
         donutChart.innerHTML = "";

         const newChart = new ApexCharts(donutChart, chartOptions);
         setChart(newChart);
         newChart.render();
      }
   }, [chartOptions]);

   return (
      <div className=" w-full bg-white rounded-lg shadow p-5 md:p-8 h-full">
         <div className="flex justify-between mb-5">
            <div className="flex justify-center items-center">
               <h5 className="text-xl font-bold leading-none text-blue-950 pe-1">
                  Contributions
               </h5>
            </div>
         </div>

         {/* <!-- Donut Chart --> */}
         <div className="py-6" id="donut-chart"></div>
      </div>
   );
};

export default DonutChart;
