import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/components/auth/auth-context";
import { Loader2Icon } from "lucide-react";

const ProtectedLayout = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div>
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
