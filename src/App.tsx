import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";

const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/login"));
const Admin = lazy(() => import("./pages/admin"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute").then((module) => ({ default: module.ProtectedRoute })));

const AuthLayout = lazy(() => import("@/components/AuthLayout"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F8F7F4]">
    <div className="w-12 h-12 border-4 border-[#BB9E7A]/20 border-t-[#BB9E7A] rounded-full animate-spin" />
  </div>
);

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/proyectos" element={<Index />} />
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AuthLayout><Admin /></AuthLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
