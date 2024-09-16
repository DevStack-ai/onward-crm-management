import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../../../providers/Auth";

export function Logout() {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
    document.location.reload();
  }, [logout]);

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
}
