import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// util
import { dateFormat } from "@src/libs";

// type
import type { FetchDataResposne } from "@src/types";

type Props = {
  tierHistory: FetchDataResposne["tierHistory"];
};

/**
 * 2022/10/26 - apexChart options - by 1-blue
 */
const options: ApexCharts.ApexOptions = {
  stroke: { curve: "smooth", width: 2 },
  yaxis: {
    show: false,
  },
  chart: {
    toolbar: {
      show: false,
    },
  },
  colors: ["#6366f1"],
  grid: {
    row: {
      colors: ["#ededed"],
    },
  },
};

const TierChart = ({ tierHistory }: Props) => {
  return (
    <div className="relative -top-10 flex-1 w-full max-w-[500px] min-w-[300px]">
      <ApexCharts
        type="line"
        options={{
          ...options,
          xaxis: {
            type: "datetime",
            categories: tierHistory.map((v) => v.updated),
            labels: {
              formatter(value) {
                return dateFormat(+value, "YYYY-MM-DD");
              },
            },
          },
          tooltip: {
            custom({ dataPointIndex }) {
              const { tier, leaguePoint, updated } =
                tierHistory[dataPointIndex];

              return `
                <ul class="chart-tooltip">
                  <li>${tier} - ${leaguePoint}</li>
                  <li>
                    <small>${dateFormat(updated, "YYYY-MM-DD")}<small>
                  </li>
                </ul>
              `;
            },
          },
        }}
        series={[
          {
            name: "tier",
            data: tierHistory.map((v) => v.normalizedPoint),
          },
        ]}
      />
    </div>
  );
};

export default TierChart;
