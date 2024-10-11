import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function useRole(allowedRoles, redirectPath = "/") {
  const userRole = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const hasPermission = allowedRoles.includes(userRole);

  useEffect(() => {
    if (!hasPermission) {
      navigate(redirectPath);
    }
  }, [hasPermission, navigate, redirectPath]);

  return { hasPermission };
}

export default useRole;
