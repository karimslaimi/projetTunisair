import clsx from "clsx";
import {useEffect, useRef, useState} from "react";
import Button from "../../base-components/Button";
import TinySlider, {
    TinySliderElement,
} from "../../base-components/TinySlider";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import Litepicker from "../../base-components/Litepicker";
import ReportDonutChart from "../../components/ReportDonutChart";
import ReportLineChart from "../../components/ReportLineChart";
import ReportPieChart from "../../components/ReportPieChart";
import {Menu} from "../../base-components/Headless";
import statService from "../../Services/StatService";
import {DateTime} from "luxon";
import {chartColors} from "../../utils/helper";

function Main() {

    //region count
    const [volCount, setVolCount] = useState(0);
    const [retardCount, setRetardCount] = useState(0);
    const [articleCount, setArticleCount] = useState(0);
    const [contratCount, setContratCount] = useState(0);
    //endregion

    //region chart
    const [pieChartData, setPieChartData] = useState<any[]>([]);
    const [donutChartData, setDonutChartData] = useState<any[]>([]);
    const [lineChartData, setLineChartData] = useState<any[]>([]);
    //endregion
    //region latest Delay
    const [latestDelay, setLatestDelay] = useState<any[]>([]);
    //endregion
    //region latest Contract
    const [latestContract, setLatestContract] = useState<any[]>([]);
    //endregion

    //region config
    const [salesReportFilter, setSalesReportFilter] = useState<string>();
    const importantNotesRef = useRef<TinySliderElement>();
    const prevImportantNotes = () => {
        importantNotesRef.current?.tns.goTo("prev");
    };
    const nextImportantNotes = () => {
        importantNotesRef.current?.tns.goTo("next");
    };
    //endregion

    //region fetch data
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        statService.countStat().then(x => {
            setVolCount(x.flightCount);
            setArticleCount(x.articlesCount);
            setContratCount(x.contractCount);
            setRetardCount(x.delayCount);
        }).catch(() => alert("an error occured"));

        statService.latestDelay().then(x => setLatestDelay(x.data)).catch(() => alert("an error occured"));
        statService.latestContract().then(x => setLatestContract(x.data)).catch(() => alert("an error occured"));
        setTimeout(() => {
            statService.contractCountBySupplier().then(x => setPieChartData(x.data)).catch(() => alert("an error occured"))
        }, 100);
        setTimeout(() => {
            statService.contractByRetard().then(x => setDonutChartData(x.data)).catch(() => alert("an error occured"))
        }, 100);
        setTimeout(() => {
            statService.getMonthlyVolCounts().then(x => setLineChartData(x.data)).catch(() => alert("an error occured"))
        }, 100);
    }
    //endregion

    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 2xl:col-span-9">
                <div className="grid grid-cols-12 gap-6">
                    {/* BEGIN: General Report */}
                    <div className="col-span-12 mt-8">
                        <div className="flex items-center h-10 intro-y">
                            <h2 className="mr-5 text-lg font-medium truncate">
                                General Report
                            </h2>
                            <a className="flex items-center ml-auto text-primary" onClick={getData}>
                                <Lucide icon="RefreshCcw" className="w-4 h-4 mr-3"/> Reload
                                Data
                            </a>
                        </div>
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div
                                    className={clsx([
                                        "relative zoom-in",
                                        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                                    ])}
                                >
                                    <div className="p-5 box">
                                        <div className="flex">
                                            <Lucide
                                                icon="Plane"
                                                className="w-[28px] h-[28px] text-primary"
                                            />
                                            <div className="ml-auto">
                                                <Tippy
                                                    as="div"
                                                    className="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                                                    content="33% Higher than last month"
                                                >
                                                    TU
                                                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5"/>
                                                </Tippy>
                                            </div>
                                        </div>
                                        <div className="mt-6 text-3xl font-medium leading-8">
                                            {volCount}
                                        </div>
                                        <div className="mt-1 text-base text-slate-500">
                                            Flight Number
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div
                                    className={clsx([
                                        "relative zoom-in",
                                        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                                    ])}
                                >
                                    <div className="p-5 box">
                                        <div className="flex">
                                            <Lucide
                                                icon="AlarmMinus"
                                                className="w-[28px] h-[28px] text-pending"
                                            />
                                            <div className="ml-auto">
                                                <Tippy
                                                    as="div"
                                                    className="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                                                    content="2% Lower than last month"
                                                >
                                                    TU
                                                    <Lucide
                                                        icon="ChevronUp"
                                                        className="w-4 h-4 ml-0.5"
                                                    />
                                                </Tippy>
                                            </div>
                                        </div>
                                        <div className="mt-6 text-3xl font-medium leading-8">
                                            {retardCount}
                                        </div>
                                        <div className="mt-1 text-base text-slate-500">
                                            Delays
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div
                                    className={clsx([
                                        "relative zoom-in",
                                        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                                    ])}
                                >
                                    <div className="p-5 box">
                                        <div className="flex">
                                            <Lucide
                                                icon="Menu"
                                                className="w-[28px] h-[28px] text-warning"
                                            />
                                            <div className="ml-auto">
                                                <Tippy
                                                    as="div"
                                                    className="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                                                    content="12% Higher than last month"
                                                >
                                                    TU
                                                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5"/>
                                                </Tippy>
                                            </div>
                                        </div>
                                        <div className="mt-6 text-3xl font-medium leading-8">
                                            {articleCount}
                                        </div>
                                        <div className="mt-1 text-base text-slate-500">
                                            Total Articles
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div
                                    className={clsx([
                                        "relative zoom-in",
                                        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
                                    ])}
                                >
                                    <div className="p-5 box">
                                        <div className="flex">
                                            <Lucide
                                                icon="FileText"
                                                className="w-[28px] h-[28px] text-success"
                                            />
                                            <div className="ml-auto">
                                                <Tippy
                                                    as="div"
                                                    className="cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium"
                                                    content="22% Higher than last month"
                                                >
                                                    TU
                                                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-0.5"/>
                                                </Tippy>
                                            </div>
                                        </div>
                                        <div className="mt-6 text-3xl font-medium leading-8">
                                            {contratCount}
                                        </div>
                                        <div className="mt-1 text-base text-slate-500">
                                            Contract
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* END: General Report */}
                    {/* BEGIN: Sales Report */}
                    <div className="col-span-12 mt-8 lg:col-span-6">
                        <div className="items-center block h-10 intro-y sm:flex">
                            <h2 className="mr-5 text-lg font-medium truncate">
                                Sales Report
                            </h2>
                            <div className="relative mt-3 sm:ml-auto sm:mt-0 text-slate-500">
                                <Lucide
                                    icon="Calendar"
                                    className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
                                />
                                <Litepicker
                                    value={salesReportFilter}
                                    onChange={setSalesReportFilter}
                                    options={{
                                        autoApply: false,
                                        singleMode: false,
                                        numberOfColumns: 2,
                                        numberOfMonths: 2,
                                        showWeekNumbers: true,
                                        dropdowns: {
                                            minYear: 1990,
                                            maxYear: null,
                                            months: true,
                                            years: true,
                                        },
                                    }}
                                    className="pl-10 sm:w-56 !box"
                                />
                            </div>
                        </div>
                        <div className="p-5 mt-12 intro-y box sm:mt-5">
                            <div className="flex flex-col md:flex-row md:items-center">
                                <div className="flex">
                                    <div>
                                        <div
                                            className="text-lg font-medium text-primary dark:text-slate-300 xl:text-xl">
                                            $15,000
                                        </div>
                                        <div className="mt-0.5 text-slate-500">This Month</div>
                                    </div>
                                    <div
                                        className="w-px h-12 mx-4 border border-r border-dashed border-slate-200 dark:border-darkmode-300 xl:mx-5"></div>
                                    <div>
                                        <div className="text-lg font-medium text-slate-500 xl:text-xl">
                                            $10,000
                                        </div>
                                        <div className="mt-0.5 text-slate-500">Last Month</div>
                                    </div>
                                </div>
                                <Menu className="mt-5 md:ml-auto md:mt-0">
                                    <Menu.Button
                                        as={Button}
                                        variant="outline-secondary"
                                        className="font-normal"
                                    >
                                        Filter by Category
                                        <Lucide icon="ChevronDown" className="w-4 h-4 ml-2"/>
                                    </Menu.Button>
                                    <Menu.Items className="w-40 h-32 overflow-y-auto">
                                        <Menu.Item>PC & Laptop</Menu.Item>
                                        <Menu.Item>Smartphone</Menu.Item>
                                        <Menu.Item>Electronic</Menu.Item>
                                        <Menu.Item>Photography</Menu.Item>
                                        <Menu.Item>Sport</Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            </div>
                            <div
                                className={clsx([
                                    "relative",
                                    "before:content-[''] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600",
                                    "after:content-[''] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600",
                                ])}
                            >
                                <ReportLineChart height={275} data={lineChartData} className="mt-6 -mb-6"/>
                            </div>
                        </div>
                    </div>
                    {/* END: Sales Report */}
                    {/* BEGIN: Contract count by supplier */}
                    <div className="col-span-12 mt-8 sm:col-span-6 lg:col-span-3">
                        <div className="flex items-center h-10 intro-y">
                            <h2 className="mr-5 text-lg font-medium truncate">
                                Contract Count By Supplier
                            </h2>

                        </div>
                        <div className="p-5 mt-5 intro-y box">
                            <div className="mt-3">{
                                pieChartData.length > 0 &&
                                <ReportPieChart chartData={pieChartData?.map(entry => entry.count)}
                                                labels={pieChartData?.map(entry => entry.title)} height={213}/>
                            }
                            </div>
                            <div className="mx-auto mt-8 w-52 sm:w-auto">
                                {pieChartData.map((data, dataKey) => (
                                        <div className="flex items-center mt-4">
                                            <div className={`w-2 h-2 mr-3 rounded-full bg-${chartColors()[dataKey]}`}></div>
                                            <span className="truncate">{data.title}</span>
                                            <span
                                                className="ml-auto font-medium">{(data.count * 100 / contratCount).toFixed(2)}%</span>
                                        </div>

                                    )
                                )}
                            </div>


                        </div>
                    </div>
                    {/* END: Contract count by supplier */}
                    {/* BEGIN: Contrat by retard */}
                    <div className="col-span-12 mt-8 sm:col-span-6 lg:col-span-3">
                        <div className="flex items-center h-10 intro-y">
                            <h2 className="mr-5 text-lg font-medium truncate">
                                Number of delay By Contract
                            </h2>
                        </div>
                        <div className="p-5 mt-5 intro-y box">
                            <div className="mt-3">
                                {donutChartData.length > 0 &&
                                    <ReportDonutChart data={donutChartData.map(entry => entry.numberOfDelays)}
                                                      labels={donutChartData.map(entry => entry.title)} height={213}/>
                                }
                            </div>
                            <div className="mx-auto mt-8 w-52 sm:w-auto">
                                {donutChartData.map((data, dataKey) => (
                                    <div className="flex items-center mt-4">
                                        <div className={`w-2 h-2 mr-3 rounded-full bg-${chartColors()[dataKey]}`}></div>
                                        <span className="truncate">{data.title}</span>
                                        <span
                                            className="ml-auto font-medium">{(data.numberOfDelays * 100 / retardCount).toFixed(2)}%</span>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                    {/* END: Sales Report */}


                </div>
            </div>
            <div className="col-span-12 2xl:col-span-3">
                <div className="pb-10 -mb-10 2xl:border-l">
                    <div className="grid grid-cols-12 2xl:pl-6 gap-x-6 2xl:gap-x-0 gap-y-6">
                        {/* BEGIN: Latest Delays */}
                        <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12 2xl:mt-8">
                            <div className="flex items-center h-10 intro-x">
                                <h2 className="mr-5 text-lg font-medium truncate">
                                    Latest Delays
                                </h2>
                            </div>
                            <div className="mt-5">
                                {latestDelay.map((delay, delayKey) => (
                                    <div key={delayKey} className="intro-x">
                                        <div className="flex items-center px-5 py-3 mb-3 box zoom-in">
                                            <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">

                                            </div>
                                            <div className="ml-4 mr-auto">
                                                <div className="font-medium">{delay.vol.num_vol}</div>
                                                <div className="text-slate-500 text-xs mt-0.5">
                                                    {DateTime.fromISO(delay.created_at).toFormat('dd/MM/yyyy H:m:s')}
                                                </div>
                                            </div>
                                            <div
                                                className={"text-danger"}
                                            >
                                                {delay.duree_retard}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <a
                                    href="/retards"
                                    className="block w-full py-3 text-center border border-dotted rounded-md intro-x border-slate-400 dark:border-darkmode-300 text-slate-500"
                                >
                                    View More
                                </a>
                            </div>
                        </div>
                        {/* END: Latest Delays */}
                        {/* BEGIN: Recent contract */}
                        <div className="col-span-12 mt-3 md:col-span-6 xl:col-span-4 2xl:col-span-12">
                            <div className="flex items-center h-10 intro-x">
                                <h2 className="mr-5 text-lg font-medium truncate">
                                    Recent Contract
                                </h2>
                                <a href="/contract" className="ml-auto truncate text-primary">
                                    Show More
                                </a>
                            </div>
                            <div
                                className="mt-5 relative before:block before:absolute before:w-px before:h-[85%] before:bg-slate-200 before:dark:bg-darkmode-400 before:ml-5 before:mt-5">
                                {latestContract.map((contrat, contratKey) => (
                                    <div key={contratKey} className="relative flex items-center mb-3 intro-x">
                                        <div
                                            className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                                            <div className="flex-none w-10 h-10 overflow-hidden rounded-full image-fit">

                                            </div>
                                        </div>
                                        <div className="flex-1 px-5 py-3 ml-4 box zoom-in">
                                            <div className="flex items-center">
                                                <div className="font-medium">
                                                    {contrat.title}
                                                </div>
                                                <div className="ml-auto text-xs text-slate-500">
                                                    {DateTime.fromISO(contrat.created_at).toFormat('dd/MM/yyyy H:m:s')}
                                                </div>
                                            </div>
                                            <div className="mt-1 text-slate-500">
                                                {contrat.prix_menu}
                                            </div>
                                        </div>
                                    </div>))}

                            </div>
                        </div>
                        {/* END: Recent contract */}


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
