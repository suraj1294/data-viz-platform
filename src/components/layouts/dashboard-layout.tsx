import { useState, type FC } from "react";
import AppSidebar from "@/components/common/app-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const DashboardLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState("Charging Stations");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                {["Charging Stations", "Fleet Sizing", "Parking"].map((tab) => (
                  <Button
                    key={tab}
                    variant={activeTab === tab ? "secondary" : "ghost"}
                    className={`px-4 py-2 rounded-sm text-sm ${
                      activeTab === tab
                        ? "bg-[var(--color-active)] border border-[var(--color-active-border)] text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </Button>
                ))}
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search"
                className="pl-10 bg-[var(--color-active)] border-[var(--color-active-border)] text-white placeholder-gray-400 w-64"
              />
            </div>
          </div>
          <div className="flex-1 bg-[var(--light)] rounded-t-md border border-[var(--color-active-border)]">
            <div className="px-6 py-3">{children}</div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
