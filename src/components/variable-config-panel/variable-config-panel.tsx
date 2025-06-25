import type { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState, useEffect, useRef } from "react";
import { SearchActions } from "./search-actions";
import { VariableCategory } from "./variable-category";
import { VariableSelector } from "./variable-selector";
import { CollapsibleVariableSection } from "./collapsible-variable-section";
import { InfoCard } from "./info-card";
import { cn } from "@/lib/utils";

interface VariableInfo {
  id: string;
  text: string;
  category: string;
  isSelected: boolean;
  info: {
    title: string;
    description: string;
  };
}

const sampleVariables: VariableInfo[] = [
  {
    id: "carbon",
    text: "Carbon",
    category: "category1",
    isSelected: false,
    info: {
      title: "Carbon Emissions",
      description:
        "Represents the total carbon emissions in metric tons CO2 equivalent.",
    },
  },
  {
    id: "co2_distribution",
    text: "Co2 Distribution",
    category: "category1",
    isSelected: true,
    info: {
      title: "CO2 Distribution",
      description:
        "Shows how carbon dioxide emissions are distributed across different sources and activities.",
    },
  },
  {
    id: "fleet_sizing",
    text: "Fleet sizing",
    category: "category1",
    isSelected: true,
    info: {
      title: "Fleet Sizing",
      description:
        "Determines the optimal number of vehicles needed to meet service demands.",
    },
  },
  {
    id: "parking_rate",
    text: "Parking Rate",
    category: "category2",
    isSelected: false,
    info: {
      title: "Parking Rate",
      description: "The rate at which vehicles are parked in designated areas.",
    },
  },
  {
    id: "border_rate",
    text: "Border Rate",
    category: "category2",
    isSelected: true,
    info: {
      title: "Border Rate",
      description:
        "Rate of cross-border transportation and associated emissions.",
    },
  },
  {
    id: "request_rate",
    text: "Request rate",
    category: "category2",
    isSelected: true,
    info: {
      title: "Request Rate",
      description: "Frequency of service requests within a given timeframe.",
    },
  },
  {
    id: "variable1",
    text: "variable 1",
    category: "category2",
    isSelected: false,
    info: {
      title: "Variable 1",
      description: "A customizable variable for specific analysis needs.",
    },
  },
  {
    id: "variable2",
    text: "variable 2",
    category: "category2",
    isSelected: false,
    info: {
      title: "Variable 2",
      description: "Secondary customizable variable for extended analysis.",
    },
  },
  {
    id: "variable3",
    text: "variable 3",
    category: "category2",
    isSelected: true,
    info: {
      title: "Variable 3",
      description: "Tertiary variable for comprehensive data modeling.",
    },
  },
  {
    id: "var1_cat3",
    text: "variable 1",
    category: "category3",
    isSelected: false,
    info: {
      title: "Category 3 Variable 1",
      description: "First variable specific to category 3 analysis.",
    },
  },
  {
    id: "var3_cat3",
    text: "variable 3",
    category: "category3",
    isSelected: true,
    info: {
      title: "Category 3 Variable 3",
      description: "Third variable specific to category 3 analysis.",
    },
  },
  {
    id: "var2_cat3",
    text: "variable 2",
    category: "category3",
    isSelected: false,
    info: {
      title: "Category 3 Variable 2",
      description: "Second variable specific to category 3 analysis.",
    },
  },
  // Primary variables
  {
    id: "carbon_intensity",
    text: "Carbon Intensity",
    category: "primary",
    isSelected: true,
    info: {
      title: "Carbon Intensity",
      description:
        "Measures the amount of CO2 emitted per unit of energy consumed.",
    },
  },
  {
    id: "energy_mix",
    text: "Energy Mix",
    category: "primary",
    isSelected: false,
    info: {
      title: "Energy Mix",
      description:
        "The combination of different energy sources used in a system.",
    },
  },
  {
    id: "emission_factor",
    text: "Emission Factor",
    category: "primary",
    isSelected: true,
    info: {
      title: "Emission Factor",
      description:
        "The average emission rate of a given pollutant relative to the intensity of a specific activity.",
    },
  },
  {
    id: "renewable_percentage",
    text: "Renewable Percentage",
    category: "primary",
    isSelected: false,
    info: {
      title: "Renewable Percentage",
      description: "The proportion of energy derived from renewable sources.",
    },
  },
  // Secondary variables
  {
    id: "grid_factor",
    text: "Grid Factor",
    category: "secondary",
    isSelected: false,
    info: {
      title: "Grid Factor",
      description:
        "The carbon intensity of the electricity grid in a specific region.",
    },
  },
  {
    id: "transmission_loss",
    text: "Transmission Loss",
    category: "secondary",
    isSelected: true,
    info: {
      title: "Transmission Loss",
      description:
        "Energy lost during electricity transmission and distribution.",
    },
  },
  {
    id: "distribution_factor",
    text: "Distribution Factor",
    category: "secondary",
    isSelected: false,
    info: {
      title: "Distribution Factor",
      description:
        "Factor accounting for how resources are distributed across a network.",
    },
  },
  {
    id: "regional_coefficient",
    text: "Regional Coefficient",
    category: "secondary",
    isSelected: true,
    info: {
      title: "Regional Coefficient",
      description:
        "Location-specific multiplier that adjusts calculations based on regional characteristics.",
    },
  },
];

const VariableConfigPanel: FC<{
  showEditPanel: boolean;
  setShowEditPanel: (value: boolean) => void;
}> = ({ showEditPanel, setShowEditPanel }) => {
  const [searchValue, setSearchValue] = useState("");
  const [variables, setVariables] = useState<VariableInfo[]>(sampleVariables);
  const [hoveredVariable, setHoveredVariable] = useState<VariableInfo | null>(
    null
  );
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const filteredVariables = variables.filter(
    (variable) =>
      variable.text.toLowerCase().includes(searchValue.toLowerCase()) ||
      variable.info.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Group variables by category
  const groupedVariables = filteredVariables.reduce<
    Record<string, VariableInfo[]>
  >((acc, variable) => {
    if (!acc[variable.category]) {
      acc[variable.category] = [];
    }
    acc[variable.category].push(variable);
    return acc;
  }, {});

  const toggleVariableSelection = (id: string) => {
    setVariables((prev) =>
      prev.map((variable) =>
        variable.id === id
          ? { ...variable, isSelected: !variable.isSelected }
          : variable
      )
    );
  };

  // Handle variable hover with debounce
  const handleVariableHover = (variable: VariableInfo | null) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    if (variable) {
      // Set a timeout to show the info card after a short delay
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredVariable(variable);
        setIsInfoVisible(true);
      }, 150);
    } else {
      // When mouse leaves, add a small delay before hiding
      hoverTimeoutRef.current = setTimeout(() => {
        setIsInfoVisible(false);
        setTimeout(() => {
          setHoveredVariable(null);
        }, 200);
      }, 100);
    }
  };

  // Clean up any timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleAutofill = () => {
    // handle autofill
  };

  const handleRerun = () => {
    // handle rerun
  };

  // Get category display names
  const getCategoryDisplayName = (category: string): string => {
    const categoryMap: Record<string, string> = {
      category1: "Variable Category 1",
      category2: "Variable Category 2",
      category3: "Variable Category 3",
      primary: "Primary Variables",
      secondary: "Secondary Variables",
    };
    return categoryMap[category] || category;
  };

  return (
    <Sheet open={showEditPanel} onOpenChange={setShowEditPanel}>
      <SheetContent
        side="right"
        className="min-w-[700px] border-[var(--color-active-border)] p-0"
      >
        <SheetHeader className="p-4">
          <SheetTitle className="text-lg font-semibold text-white">
            Edit Variables
          </SheetTitle>
        </SheetHeader>

        {/* Search and Actions */}
        <SearchActions
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onAutofill={handleAutofill}
          onRerun={handleRerun}
        />

        {/* Panel Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="flex flex-col p-4 rounded-md border bg-[#161618] border-[#525252] gap-6">
            {Object.entries(groupedVariables)
              .filter(
                ([category]) => !["primary", "secondary"].includes(category)
              )
              .map(([category, vars]) => (
                <VariableCategory
                  key={category}
                  title={getCategoryDisplayName(category)}
                >
                  <div className="flex flex-wrap gap-2">
                    {vars.map((variable) => (
                      <VariableSelector
                        key={variable.id}
                        text={variable.text}
                        isSelected={variable.isSelected}
                        onClick={() => toggleVariableSelection(variable.id)}
                        onMouseEnter={() => handleVariableHover(variable)}
                        onMouseLeave={() => handleVariableHover(null)}
                      />
                    ))}
                  </div>
                </VariableCategory>
              ))}

            <div
              className={cn(
                "transition-all duration-300 ease-in-out",
                isInfoVisible && hoveredVariable
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-2 pointer-events-none h-0 overflow-hidden"
              )}
            >
              {hoveredVariable && (
                <InfoCard
                  title={hoveredVariable.info.title}
                  description={hoveredVariable.info.description}
                />
              )}
            </div>
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-2">
            {groupedVariables.primary && (
              <CollapsibleVariableSection title="Primary Variables">
                <div className="flex flex-wrap gap-2">
                  {groupedVariables.primary.map((variable) => (
                    <VariableSelector
                      key={variable.id}
                      text={variable.text}
                      isSelected={variable.isSelected}
                      onClick={() => toggleVariableSelection(variable.id)}
                    />
                  ))}
                </div>
              </CollapsibleVariableSection>
            )}

            {groupedVariables.secondary && (
              <CollapsibleVariableSection title="Secondary Variables">
                <div className="flex flex-wrap gap-2">
                  {groupedVariables.secondary.map((variable) => (
                    <VariableSelector
                      key={variable.id}
                      text={variable.text}
                      isSelected={variable.isSelected}
                      onClick={() => toggleVariableSelection(variable.id)}
                    />
                  ))}
                </div>
              </CollapsibleVariableSection>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default VariableConfigPanel;
