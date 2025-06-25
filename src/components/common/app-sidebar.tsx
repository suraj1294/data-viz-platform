import {
  Bell,
  Home,
  Settings,
  ChevronsUpDown,
  AlignJustify,
  ClipboardCheck,
  CloudUpload,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/components/auth/auth-context";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    isActive: true,
  },
  {
    title: "Notifications",
    icon: Bell,
  },
  {
    title: "Management",
    icon: ClipboardCheck,
  },
  {
    title: "Upload",
    icon: CloudUpload,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

function AppSidebar() {
  const { user, logout } = useAuth();
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 flex items-center bg-[#0E0D0D]">
        <SidebarTrigger
          className={cn(
            "text-gray-400 hover:text-white",
            open ? "ml-auto" : ""
          )}
          asChild
        >
          <AlignJustify />
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent className="p-2 bg-[#0E0D0D]">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                isActive={item.isActive}
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 data-[active=true]:bg-[var(--color-active)] data-[active=true]:text-white"
              >
                <item.icon className="h-6 w-6" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="bg-[#0E0D0D]">
        <NavUser
          user={{
            email: user?.email || "",
            onLogout: logout,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;

export function NavUser({
  user,
}: {
  user: {
    email: string;
    onLogout: () => void;
  };
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="rounded-lg">
                <AvatarFallback className="rounded-lg">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19.2C9.5 19.2 7.29 17.92 6 16C6.03 14 10 12.9 12 12.9C14 12.9 17.97 14 18 16C16.71 17.92 14.5 19.2 12 19.2ZM12 5C12.7956 5 13.5587 5.31607 14.1213 5.87868C14.6839 6.44129 15 7.20435 15 8C15 8.79565 14.6839 9.55871 14.1213 10.1213C13.5587 10.6839 12.7956 11 12 11C11.2044 11 10.4413 10.6839 9.87868 10.1213C9.31607 9.55871 9 8.79565 9 8C9 7.20435 9.31607 6.44129 9.87868 5.87868C10.4413 5.31607 11.2044 5 12 5ZM12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 6.47 17.5 2 12 2Z"
                      fill="white"
                    />
                  </svg>
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={user.onLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
