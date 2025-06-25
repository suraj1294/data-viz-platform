import type { FC } from "react";
import { Search, Plus, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchActionsProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onAutofill?: () => void;
  onRerun?: () => void;
}

export const SearchActions: FC<SearchActionsProps> = ({
  searchValue = "",
  onSearchChange,
  onAutofill,
  onRerun,
}) => {
  return (
    <div className="p-4 border-b border-gray-700">
      <div className="flex space-x-2 mb-4">
        <div className="flex items-center flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
          <Input
            placeholder="Search variables"
            className="pl-10 bg-[var(--color-active)] border-[var(--color-active-border)] text-white"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="lg"
          className="bg-[var(--color-active)] border-[var(--color-active-border)] text-white cursor-pointer"
          onClick={onAutofill}
        >
          <Plus className="h-4 w-4 mr-1" />
          Autofill
        </Button>
        <Button
          size="lg"
          variant="default"
          className="text-[var(--variable-accent-border)] bg-[var(--variable-accent-border)]/10 border border-[var(--variable-accent-border)] hover:bg-[var(--variable-accent-border)]/20 hover:border-[var(--variable-accent-border)]/80 cursor-pointer"
          onClick={onRerun}
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Rerun
        </Button>
      </div>
    </div>
  );
};
