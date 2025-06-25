import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceDot,
} from "recharts";

// Sample data for the chart
const data = [
  { name: "Apr", value: 20000, target: 18500, percentAboveTarget: 8.1 },
  { name: "May", value: 50000, target: 47800, percentAboveTarget: 4.6 },
  { name: "Jun", value: 40000, target: 42000, percentAboveTarget: -4.8 },
  { name: "Jul", value: 60000, target: 55000, percentAboveTarget: 9.1 },
  { name: "Aug", value: 35000, target: 38000, percentAboveTarget: -7.9 },
  { name: "Sep", value: 80000, target: 75000, percentAboveTarget: 6.7 },
];

// Define which points to highlight
const highlightPoints = [1, 3, 5]; // May, Jul, Sep

// Custom tooltip component
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      value: number;
      percentAboveTarget: number;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isAboveTarget = data.percentAboveTarget > 0;

    return (
      <div className="bg-[var(--dashboard-tooltip-bg)] border border-[var(--dashboard-tooltip-border)] rounded-md p-3 shadow-lg">
        <p className="text-2xl font-bold text-white">
          ${(data.value / 1000).toFixed(2)}k
        </p>
        <div className="flex items-center gap-1 mt-1">
          <span
            className={`${
              isAboveTarget
                ? "text-[var(--dashboard-positive)]"
                : "text-[var(--dashboard-negative)]"
            }`}
          >
            {isAboveTarget ? "↑" : "↓"} {Math.abs(data.percentAboveTarget)}%{" "}
            {isAboveTarget ? "above" : "below"} target
          </span>
        </div>
      </div>
    );
  }
  return null;
};

// Format Y-axis values
const formatYAxis = (value: number) => {
  if (value >= 1000) {
    return `$${value / 1000}K`;
  }
  return `$${value}`;
};

const ProfitChart = () => {
  return (
    <div className="w-full h-full">
      <div className="absolute top-0 right-0 p-2 z-10">
        <Button
          variant="ghost"
          className="text-white bg-black/30 text-xs px-3 py-1 h-auto rounded-md flex items-center gap-1"
        >
          Unsatisfied Demand % <ChevronDown className="h-3 w-3" />
        </Button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--variable-accent)"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="var(--variable-accent)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={true}
            horizontal={true}
            stroke="var(--dashboard-grid-line)"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--dashboard-text-muted)", fontSize: 12 }}
          />
          <YAxis
            tickFormatter={formatYAxis}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--dashboard-text-muted)", fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="linear"
            dataKey="value"
            stroke="var(--variable-accent)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
            dot={false}
            activeDot={{
              r: 6,
              fill: "var(--variable-accent)",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />

          {highlightPoints.map((index) => (
            <ReferenceDot
              key={`highlight-${index}`}
              x={data[index].name}
              y={data[index].value}
              r={4}
              fill="var(--variable-accent)"
              stroke="#fff"
              strokeWidth={1}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitChart;
