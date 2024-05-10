import { getUserProfileApi } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

const useUserProfile = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserProfileApi,
    retry: false,
  });
  return { user, isLoading };
};

export default useUserProfile;
