import SyncLoader from "@/components/ui/loaders/SyncLoader";
import useUserProfile from "./useUserProfile";
import { Navigate, useLocation } from "react-router-dom";
import { Role } from "./index.types";

interface ProtectedRouteProps {
  allowedRoles: Role[];
}

const ProtectedRoute: React.FC<
  React.PropsWithChildren<ProtectedRouteProps>
> = ({ allowedRoles, children }) => {
  const { user, isLoading } = useUserProfile();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="w-full h-screen fixed inset-0 bg-white z-50 flex items-center justify-center">
        <SyncLoader size={20} color="hsl(var(--primary))" />
      </div>
    );
  }

  const isRoleAllowed = user && allowedRoles.includes(user.role);
  if (!isRoleAllowed) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
