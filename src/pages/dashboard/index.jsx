import React, { useState } from "react";
import Card from "@/components/ui/Card";
import { useSelector } from "react-redux";

const Dashboard = () => {

  const store = useSelector((state) => state);
  console.log("store",store);
  return (
    <div>
      <Card title="Starter Kit">Your Dashboard</Card>
    </div>
  );
};

export default Dashboard;
