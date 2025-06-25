import { Card, CardContent } from "@/components/ui/card";
import ProfitChart from "./profit-chart";

const ProfitSection = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-white">Profit</h2>
      </div>
      <Card className="bg-[var(--dashboard-card-bg)] border-[var(--dashboard-card-border)] rounded-sm relative">
        <CardContent className="p-4">
          <div className="h-[300px]">
            <ProfitChart />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfitSection;
