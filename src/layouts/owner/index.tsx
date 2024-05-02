import TopBar from "@/components/layout/TopBar";
import { Outlet } from "react-router-dom";

const OwnerLayout = () => {
  return (
    <>
      <TopBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default OwnerLayout;
