import Chart from "../../base-components/Chart";
import { ChartData, ChartOptions } from "chart.js/auto";
import { getColor } from "../../utils/colors";
import { selectColorScheme } from "../../stores/colorSchemeSlice";
import { selectDarkMode } from "../../stores/darkModeSlice";
import { useAppSelector } from "../../stores/hooks";
import { useMemo } from "react";
import {array} from "yup";

interface MainProps extends React.ComponentPropsWithoutRef<"canvas"> {
  width?: number;
  height?: number;
  chartData: number[];
  labels : string[];
}

function Main(props: MainProps) {
  const colorScheme = useAppSelector(selectColorScheme);
  const darkMode = useAppSelector(selectDarkMode);
  setTimeout(()=>{},150);
  const chartColors = () => [
    getColor("primary", 0.9),
    getColor("pending", 0.9),
    getColor("secondary", 0.9),
    getColor("success", 0.9),
    getColor("info", 0.9),
    getColor("warning", 0.9),
    getColor("danger", 0.9),
    getColor("light", 0.9),
    getColor("dark", 0.9),
  ];
  const data: ChartData = useMemo(() => {
    return {
      labels: props.labels,
      datasets: [
        {
          data: props.chartData,
          backgroundColor: colorScheme ? chartColors() : "",
          hoverBackgroundColor: colorScheme ? chartColors() : "",
          borderWidth: 5,
          borderColor: darkMode ? getColor("darkmode.700") : getColor("white"),
        },
      ],
    };
  }, [colorScheme, darkMode]);

  const options: ChartOptions = useMemo(() => {
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
        },
      },
    };
  }, [colorScheme, darkMode]);

  return (
    <Chart
      type="pie"
      width={props.width}
      height={props.height}
      data={data}
      options={options}
      className={props.className}
    />
  );
}

Main.defaultProps = {
  width: "auto",
  height: "auto",
  className: "",
};

export default Main;
