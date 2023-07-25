import React from "react";
import Sidebar from "./Sidebar";

import { Outlet } from "react-router-dom";
const Body = () => {
  return (
    <div className="flex grid grid-flow-col col-span-1">
      <Sidebar />
      <Outlet />
    </div>
  );
};
 
export default Body;
