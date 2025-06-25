import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface ScenarioResultsProps {
  expanded?: boolean;
}

const ScenarioResults = ({ expanded = true }: ScenarioResultsProps) => {
  const [scenarioExpanded, setScenarioExpanded] = useState(expanded);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-[var(--variable-accent)] text-lg font-medium">
            ✦ Best Scenario Results
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-black/20 h-6 w-6 border border-[var(--variable-accent)]"
          onClick={() => setScenarioExpanded(!scenarioExpanded)}
        >
          {scenarioExpanded ? (
            <ChevronUp className="h-4 w-4 text-[var(--variable-accent)]" />
          ) : (
            <ChevronDown className="h-4 w-4 text-[var(--variable-accent)]" />
          )}
        </Button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          scenarioExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-3 pt-1">
          <ScenarioResult text="The best found configuration based on profit is characterized by 11 zones (max) with charging stations and 48 total number of poles." />
          <ScenarioResult text="The best found configuration based on satisfied demand is characterized by 11 zones (max) with charging stations and 48 total number of poles." />
        </div>
      </div>
    </div>
  );
};

const ScenarioResult = ({ text }: { text: string }) => {
  return (
    <div className="border border-[var(--variable-accent)] bg-black/20 rounded-md p-3 md:p-4 mb-3 flex justify-between items-center transition-all duration-300 hover:bg-black/30">
      <p className="text-[var(--variable-accent)] text-sm md:text-base pr-2">
        {text}
      </p>
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-400 hover:text-white flex-shrink-0"
      >
        <MoreHorizontal className="h-4 w-4 md:h-5 md:w-5" />
      </Button>
    </div>
  );
};

export default ScenarioResults;
