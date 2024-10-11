import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function useAuthRedirect(shouldRedirect = true, redirectPath = "/") {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && shouldRedirect) {
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate, redirectPath, shouldRedirect]);
}

export default useAuthRedirect;
