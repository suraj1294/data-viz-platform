import type { FC } from "react";
import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface InfoCardProps {
  title: string;
  description: string;
}

export const InfoCard: FC<InfoCardProps> = ({ title, description }) => {
  return (
    <Card className="bg-[#161618] border-[#525252] rounded-md border-x-0 border-b-0 rounded-t-none -mx-4 -mb-4">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div>
            <div className="flex items-center gap-1">
              <h3 className="font-medium text-white mb-1">{title}</h3>
              <Info className="h-4 w-4" />
            </div>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
