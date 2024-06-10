"use client";
import React, { useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import ChartFour from "../Charts/ChartFour.jsx";
import DataStats from "../DataStats/DataStats.jsx";
import ChartThree from "../Charts/ChartThree.jsx";
import TopContent from "../TopContent.jsx";
import TopChannels from "../TopChannels.jsx";
import TableTwo from "../Tables/TableTwo.jsx";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ToDoList from "../Todo/ToDoList.jsx";
import DataStatsThree from "../DataStats/DataStatsThree.jsx";
import SellerSales from "./SellerSales.jsx"


// without this the component renders on server and throws an error
import dynamic from "next/dynamic";

const MapTwo = dynamic(() => import("../Maps/MapTwo.jsx"), {
    ssr: false,
});

const Analytics = () => {
    useEffect(() => {
        // Init flatpickr
        const fp = flatpickr(".datepicker", {
            mode: "range",
            static: true,
            monthSelectorType: "static",
            dateFormat: "M j, Y",
            defaultDate: [new Date().setDate(new Date().getDate() - 6), new Date()],
            prevArrow:
                '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
            nextArrow:
                '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
            onReady: (selectedDates, dateStr, instance) => {
                instance.element.value = dateStr.replace("to", "-");
                const customClass = instance.element.getAttribute("data-class");
                instance.calendarContainer.classList.add(customClass);
                selectedDates;
            },
            onChange: (selectedDates, dateStr, instance) => {
                instance.element.value = dateStr.replace("to", "-");
                selectedDates;
            },
        });

        return () => {
            (fp).destroy();
        };
    }, []);

    return (
        <DefaultLayout>
            <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
                
                {/* <ChartFour /> // Estas son las barras horizontales de total de visitas \\ */}
                <DataStatsThree />
                {/*///////////////// <DataStats /> Este es el que estaba antes \\\\\\\\\\\\\\\\\\\\\\\\\\ */}
                {/* <MapTwo /> */}
                <div className="col-span-12 xl:col-span-6 max-w-full">
                    {/* <!-- ====== Top Content Start --> */}
                    {/* <TopContent /> */}
                    <div className="flex w-full overflow-x-auto">
                        <SellerSales />
                    </div>

                    {/* <!-- ====== Top Content End --> */}

                    {/* <!-- ====== Top Channels Start --> */}
                    {/* <TopChannels /> */}

                    {/* <!-- ====== Top Channels End --> */}
                </div>

                <div className="col-span-12 xl:col-span-6">
                    {/* <!-- ====== Top Content Start --> */}
                    {/* <TopContent /> */}
                    <ChartThree />

                    {/* <!-- ====== Top Content End --> */}

                    {/* <!-- ====== Top Channels Start --> */}
                    {/* <TopChannels /> */}

                    {/* <!-- ====== Top Channels End --> */}
                </div>


                {/* <!-- ====== Table Two Start --> */}
                <div className="col-span-12 xl:col-span-7">
                    {/* <TableTwo /> */}
                </div>
                {/* <!-- ====== Table Two End --> */}
            </div>
        </DefaultLayout>
    );
};

export default Analytics;
