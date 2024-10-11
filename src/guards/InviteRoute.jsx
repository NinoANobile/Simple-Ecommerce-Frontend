import { Navigate, Outlet, useSearchParams } from "react-router-dom";

const InviteRoute = () => {
  const [searchParams] = useSearchParams();
  const invitationCode = searchParams.get("code");

  // Si no hay código de invitación, redirige al usuario a la página principal.
  return invitationCode ? <Outlet /> : <Navigate to="/" replace />;
};

export default InviteRoute;
