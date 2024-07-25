import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function useAuth(allowedRoles) {
  const userRole = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  // Verifica si el usuario tiene uno de los roles permitidos
  const hasPermission = allowedRoles.includes(userRole);

  // Redirigir si el usuario no tiene permiso
  const redirectIfUnauthorized = (redirectPath = "/") => {
    if (!hasPermission) {
      navigate(redirectPath);
    }
  };

  return { hasPermission, redirectIfUnauthorized };
}

export default useAuth;
