import React from "react";
import Sidebar from "../components/home/Sidebar";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <div className="flex  h-[98vh] gap-2">
      <div className="border rounded-xl border-gray-500 p-4 w-1/6 flex flex-col justify-between ">
        <Sidebar />
      </div>
      <div className="border rounded-xl border-gray-500 p-4 w-5/6">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
