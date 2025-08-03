import React from "react";
import SideBar from "@/components/SideBar";
const dashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex border-b-1 border-t-1 border-neutral-800 min-h-[82vh] w-full ">
    <SideBar/>
    {children}
    </div>;
};

export default dashboardLayout;
