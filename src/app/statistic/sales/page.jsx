import React from "react";
import "flatpickr/dist/flatpickr.min.css";
import ChartThree from "../Charts/ChartThree.jsx";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DataStatsThree from "../DataStats/DataStatsThree.jsx";
import SellerSales from "./SellerSales.jsx"


const Analytics = () => {

    return (
        <DefaultLayout>
            <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
                
                {/* <ChartFour /> // Estas son las barras horizontales de total de visitas \\ */}
                <DataStatsThree />
                {/*///////////////// <DataStats /> Este es el que estaba antes \\\\\\\\\\\\\\\\\\\\\\\\\\ */}
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
