"use client";

import { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminPortfolio from "./AdminPortfolio";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center">
      {isLoggedIn ? (
        <AdminPortfolio />
      ) : (
        <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
};

export default AdminPage;
