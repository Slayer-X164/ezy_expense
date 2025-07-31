import React from "react";
import SideBar from "@/components/SideBar";
const dashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex border-b-1 border-t-1 border-neutral-600 min-h-[82vh] w-full lg:min-h-[80vh]">
    <SideBar/>
    {children}
    </div>;
};

export default dashboardLayout;
