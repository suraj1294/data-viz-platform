import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router";
import { AuthProvider } from "@/components/auth/auth-context";
import { useAuth } from "@/components/auth/auth-context";
import AuthLayout from "@/components/layouts/auth-layout";
import ProtectedLayout from "@/components/layouts/protected-layout";
import { PageLoader } from "./components/common/page-loader";
const HomeLazy = lazy(() => import("@/pages/home"));
const LoginLazy = lazy(() => import("@/pages/auth/login"));
const RegisterLazy = lazy(() => import("@/pages/auth/register"));
const PageNotFoundLazy = lazy(
  () => import("@/components/common/page-not-found")
);

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path="login"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <Suspense fallback={<PageLoader />}>
                <LoginLazy />
              </Suspense>
            )
          }
        />
        <Route
          path="register"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <Suspense fallback={<PageLoader />}>
                <RegisterLazy />
              </Suspense>
            )
          }
        />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageLoader />}>
              <HomeLazy />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <Suspense fallback={<PageLoader />}>
            <PageNotFoundLazy />
          </Suspense>
        }
      />
    </Routes>
  );
};

const AppWithAuth = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default AppWithAuth;
