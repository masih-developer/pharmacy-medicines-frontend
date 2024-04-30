import { PropsWithChildren } from "react";
import TopBar from "@/components/layout/TopBar";

const OwnerLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <TopBar />
      <main>{children}</main>
    </>
  );
};

export default OwnerLayout;
