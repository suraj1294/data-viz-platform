import { useState } from "react";
import type { FC, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CollapsibleVariableSectionProps {
  title: string;
  children: ReactNode;
}

export const CollapsibleVariableSection: FC<CollapsibleVariableSectionProps> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border border-[var(--variable-panel-border)] rounded-md overflow-hidden"
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between p-4 bg-[var(--variable-panel-bg)] hover:bg-[var(--variable-panel-hover)] transition-colors">
        <span className="text-[var(--variable-accent)] font-medium">
          {title}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-[var(--variable-accent)] transition-transform duration-300 ease-in-out border border-[var(--variable-accent-border)] rounded-full",
            isOpen && "transform rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="bg-[var(--variable-panel-content-bg)] data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden transition-all duration-300 ease-in-out">
        <div className="p-4">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};
