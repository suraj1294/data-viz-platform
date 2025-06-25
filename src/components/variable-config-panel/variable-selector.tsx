import type { FC } from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VariableSelectorProps {
  text: string;
  isSelected?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const VariableSelector: FC<VariableSelectorProps> = ({ 
  text, 
  isSelected, 
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex items-center rounded-full px-2 py-1 text-sm cursor-pointer transition-all duration-200",
        isSelected
          ? "text-[var(--variable-accent-hover)] border border-[var(--variable-accent-border)] hover:text-[var(--variable-accent-hover)]/80 hover:border-[var(--variable-accent-border)]/80"
          : "bg-[var(--color-active)] border border-[var(--color-active-border)] text-[var(--variable-inactive)] hover:bg-[var(--color-active)]/80"
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span>{text}</span>
      <svg
        width="14"
        height="15"
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-1"
      >
        <path
          d="M9.93007 3L9.37496 4.21154L8.16783 4.76224L9.37496 5.31734L9.93007 6.52448L10.4808 5.31734L11.6923 4.76224L10.4808 4.21154M5.52448 4.32168L4.42308 6.74476L2 7.84615L4.42308 8.94755L5.52448 11.3706L6.62587 8.94755L9.04895 7.84615L6.62587 6.74476M9.93007 9.16783L9.37496 10.375L8.16783 10.9301L9.37496 11.4808L9.93007 12.6923L10.4808 11.4808L11.6923 10.9301L10.4808 10.375"
          fill="currentColor"
        />
      </svg>
      {isSelected ? (
        <Check className="h-3 w-3" />
      ) : (
        <Plus
          className="h-3 w-3"
          fill={
            isSelected
              ? "var(--variable-accent-hover)"
              : "var(--variable-inactive)"
          }
        />
      )}
    </Button>
  );
};
