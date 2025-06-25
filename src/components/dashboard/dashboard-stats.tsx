import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import KPICard from "./kpi-card";

interface DashboardStatsProps {
  onVariablesClick: () => void;
}

const DashboardStats = ({ onVariablesClick }: DashboardStatsProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-white">
          Key Performance Indicators
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="text-white border border-[var(--dashboard-tooltip-border)] bg-[var(--dashboard-tooltip-bg)] hover:bg-[var(--dashboard-tooltip-hover)] hover:border-[#3a3a3c] flex items-center gap-1 transition-all duration-200"
          onClick={onVariablesClick}
        >
          Variables <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <KPICard
          title="Total Revenue"
          value="$89.60k"
          change={4.6}
          description="Total revenue across all products and channels"
        />
        <KPICard
          title="Conversion Rate"
          value="12.8%"
          change={2.3}
          description="Percentage of visitors who make a purchase"
        />
        <KPICard
          title="Average Order Value"
          value="$142.50"
          change={-1.8}
          description="Average amount spent per transaction"
        />
        <KPICard
          title="Customer Acquisition Cost"
          value="$38.20"
          change={-3.2}
          description="Cost to acquire a new customer"
        />
      </div>
    </div>
  );
};

export default DashboardStats;
