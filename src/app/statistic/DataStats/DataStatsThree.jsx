"use client";
import React, { useState, useEffect } from "react";
import CircleSvg from "../../../components/Charts/CiclePercentSvg.jsx";
import { getCrmData, getCrmDataByYear, getCrmDataByYearAndMonth } from '@/services/analitycsApi'; // Ajusta la ruta según sea necesario

const DataStatsThree = () => {
  const [leadsAnalitycs, setLeadsAnalitycs] = useState();
  const [period, setPeriod] = useState('year');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (period === 'month') {
          response = await getCrmDataByYearAndMonth(year, month);
        } else {
          response = await getCrmDataByYear(year);
        }

        setLeadsAnalitycs(response);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [period, year, month]);

  useEffect(() => {
    console.log(leadsAnalitycs)
  }, [leadsAnalitycs])


  const getBgColor = (percentage) => {
    return percentage >= 0 ? 'bg-meta-3' : 'bg-red-500';
  };

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <div className="col-span-12 rounded-sm">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-title-sm2 font-bold text-black dark:text-white">
            This Week’s Overview
          </h2>
        </div>

        <div className="flex items-center">
          <div className="relative z-20 inline-block">
            <select
              name="period"
              id="period"
              value={period}
              onChange={handlePeriodChange}
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 font-medium outline-none"
            >
              <option value="year">Anual</option>
              <option value="month">Mensual</option>
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

      <div className="grid gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5">
          <div className="flex flex-col items-center justify-between gap-3">
            <div className="flex w-full">
              <div className="flex w-full justify-between">
                <h3 className="mb-4 text-title-lg font-bold text-black dark:text-white">
                  {leadsAnalitycs?.created ?? 'Loading...'}
                </h3>
                <span className="mt-2 flex items-center gap-2">
                  <span className={`flex items-center gap-1 rounded-md ${getBgColor(leadsAnalitycs?.percentageCreated)} p-1 text-xs font-medium text-white`}>
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.0155 5.24683H9.49366C9.23116 5.24683 9.01241 5.46558 9.01241 5.72808C9.01241 5.99058 9.23116 6.20933 9.49366 6.20933H11.6593L8.85928 8.09058C8.74991 8.17808 8.59678 8.17808 8.46553 8.09058L5.57803 6.18745C5.11866 5.8812 4.54991 5.8812 4.09053 6.18745L0.721783 8.44058C0.503033 8.5937 0.437408 8.89995 0.590533 9.1187C0.678033 9.24995 0.831157 9.33745 1.00616 9.33745C1.09366 9.33745 1.20303 9.31558 1.26866 9.24995L4.65928 6.99683C4.76866 6.90933 4.92178 6.90933 5.05303 6.99683L7.94053 8.92183C8.39991 9.22808 8.96866 9.22808 9.42803 8.92183L12.5124 6.8437V9.27183C12.5124 9.53433 12.7312 9.75308 12.9937 9.75308C13.2562 9.75308 13.4749 9.53433 13.4749 9.27183V5.72808C13.5187 5.46558 13.278 5.24683 13.0155 5.24683Z"
                        fill="white"
                      />
                    </svg>
                    <span>{leadsAnalitycs?.percentageCreated.toFixed(2) ?? 'Loading...'}</span>
                  </span>
                </span>
              </div>
            </div>

            <div className="flex w-full justify-between">
              <div>
                <p className="font-medium">Leads Creados</p>
                <span className="text-sm font-medium">Since last week</span>
              </div>
              <CircleSvg percentage={leadsAnalitycs?.percentageCreated.toFixed(2) ?? 0} />
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5">
          <div className="flex flex-col items-center justify-between gap-3">
            <div className="flex w-full">
              <div className="flex w-full justify-between">
                <h3 className="mb-4 text-title-lg font-bold text-black dark:text-white">
                  {leadsAnalitycs?.won ?? 'Loading...'}
                </h3>
                <span className="mt-2 flex items-center gap-2">
                  <span className={`flex items-center gap-1 rounded-md ${getBgColor(leadsAnalitycs?.percentageCreated)} p-1 text-xs font-medium text-white`}>
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.0155 5.24683H9.49366C9.23116 5.24683 9.01241 5.46558 9.01241 5.72808C9.01241 5.99058 9.23116 6.20933 9.49366 6.20933H11.6593L8.85928 8.09058C8.74991 8.17808 8.59678 8.17808 8.46553 8.09058L5.57803 6.18745C5.11866 5.8812 4.54991 5.8812 4.09053 6.18745L0.721783 8.44058C0.503033 8.5937 0.437408 8.89995 0.590533 9.1187C0.678033 9.24995 0.831157 9.33745 1.00616 9.33745C1.09366 9.33745 1.20303 9.31558 1.26866 9.24995L4.65928 6.99683C4.76866 6.90933 4.92178 6.90933 5.05303 6.99683L7.94053 8.92183C8.39991 9.22808 8.96866 9.22808 9.42803 8.92183L12.5124 6.8437V9.27183C12.5124 9.53433 12.7312 9.75308 12.9937 9.75308C13.2562 9.75308 13.4749 9.53433 13.4749 9.27183V5.72808C13.5187 5.46558 13.278 5.24683 13.0155 5.24683Z"
                        fill="white"
                      />
                    </svg>
                    <span>{leadsAnalitycs?.percentageWon.toFixed(2) ?? 'Loading...'}</span>
                  </span>
                </span>
              </div>
            </div>

            <div className="flex w-full justify-between">
              <div>
                <p className="font-medium">Leads ganados</p>
                <span className="text-sm font-medium">Since last week</span>
              </div>
              <CircleSvg percentage={leadsAnalitycs?.percentageWon.toFixed(2) ?? 0} />
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5">
          <div className="flex flex-col items-center justify-between gap-3">
            <div className="flex w-full">
              <div className="flex w-full justify-between">
                <h3 className="mb-4 text-title-lg font-bold text-black dark:text-white">
                  {leadsAnalitycs?.lost ?? 'Loading...'}
                </h3>
                <span className="mt-2 flex items-center gap-2">
                  <span className={`flex items-center gap-1 rounded-md ${getBgColor(leadsAnalitycs?.percentageCreated)} p-1 text-xs font-medium text-white`}>
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.0155 5.24683H9.49366C9.23116 5.24683 9.01241 5.46558 9.01241 5.72808C9.01241 5.99058 9.23116 6.20933 9.49366 6.20933H11.6593L8.85928 8.09058C8.74991 8.17808 8.59678 8.17808 8.46553 8.09058L5.57803 6.18745C5.11866 5.8812 4.54991 5.8812 4.09053 6.18745L0.721783 8.44058C0.503033 8.5937 0.437408 8.89995 0.590533 9.1187C0.678033 9.24995 0.831157 9.33745 1.00616 9.33745C1.09366 9.33745 1.20303 9.31558 1.26866 9.24995L4.65928 6.99683C4.76866 6.90933 4.92178 6.90933 5.05303 6.99683L7.94053 8.92183C8.39991 9.22808 8.96866 9.22808 9.42803 8.92183L12.5124 6.8437V9.27183C12.5124 9.53433 12.7312 9.75308 12.9937 9.75308C13.2562 9.75308 13.4749 9.53433 13.4749 9.27183V5.72808C13.5187 5.46558 13.278 5.24683 13.0155 5.24683Z"
                        fill="white"
                      />
                    </svg>
                    <span>{leadsAnalitycs?.percentageLost.toFixed(2) ?? 'Loading...'}</span>
                  </span>
                </span>
              </div>
            </div>

            <div className="flex w-full justify-between">
              <div>
                <p className="font-medium">Leads perdidos</p>
                <span className="text-sm font-medium">Since last week</span>
              </div>
              <CircleSvg percentage={leadsAnalitycs?.percentageLost.toFixed(2) ?? 0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataStatsThree;
