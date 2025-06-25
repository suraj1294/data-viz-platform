import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="light-dark-card h-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
