import { Card, CardContent } from "@/components/ui/card";
import { CircleQuestionMark } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  description: string;
}

const KPICard = ({ title, value, description }: KPICardProps) => {
  return (
    <Card className="rounded-sm bg-[var(--dashboard-card-bg)] border-[var(--dashboard-card-border)] transition-all duration-300 hover:border-[var(--variable-accent-border)] hover:shadow-md hover:shadow-[var(--variable-accent)]/10">
      <CardContent className="p-3 md:p-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-white font-medium text-sm md:text-base">
            {title}
          </h3>
          <CircleQuestionMark className="h-4 w-4 text-gray-400" />
        </div>
        <p className="text-xs text-gray-400 mb-3 md:mb-4 line-clamp-2">
          {description}
        </p>
        <p className="text-2xl md:text-3xl text-right font-bold text-white transition-all duration-300">
          {value}
        </p>
      </CardContent>
    </Card>
  );
};

export default KPICard;
