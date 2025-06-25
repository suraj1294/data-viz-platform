import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import VariableConfigPanel from "@/components/variable-config-panel/variable-config-panel";
import { useState, type FC } from "react";
import ProfitSection from "@/components/dashboard/profit-section";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import ScenarioResults from "@/components/dashboard/scenario-results";
import { Plus, RefreshCw, Upload, Zap } from "lucide-react";

const VariableSelectButton: FC<{
  onClick?: () => void;
  text?: string;
  icon: React.ReactNode;
}> = ({ onClick, text, icon }) => {
  return (
    <Button
      variant="outline"
      className="text-white border border-[#2a2a2c] bg-[#1a1a1c] hover:bg-[#2a2a2c] hover:border-[#3a3a3c] flex items-center gap-1 transition-all duration-200"
      onClick={onClick}
    >
      {text} {icon}
    </Button>
  );
};

const Home = () => {
  const [showEditPanel, setShowEditPanel] = useState(false);

  return (
    <DashboardLayout>
      {/* Page Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Zap className="h-8 w-8" />
            <h1 className="text-3xl font-bold text-white">Charging Station</h1>
          </div>
          <div className="flex items-center space-x-2">
            <VariableSelectButton icon={<RefreshCw className="h-4 w-4" />} />
            <VariableSelectButton
              onClick={() => setShowEditPanel(true)}
              text="Variables"
              icon={<Plus className="h-4 w-4" />}
            />
            <VariableSelectButton icon={<Upload className="h-4 w-4" />} />
          </div>
        </div>

        {/* Best Scenario Results */}
        <ScenarioResults />

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Left column - Profit Chart */}
          <div className="col-span-1 md:col-span-2">
            <ProfitSection />
          </div>

          {/* Right column - KPIs */}
          <div className="col-span-1 md:col-span-2">
            <DashboardStats onVariablesClick={() => setShowEditPanel(true)} />
          </div>
        </div>
      </div>

      {/* Variable Config Panel */}
      <VariableConfigPanel
        showEditPanel={showEditPanel}
        setShowEditPanel={setShowEditPanel}
      />
    </DashboardLayout>
  );
};

export default Home;
