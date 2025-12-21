import { useState } from "react";

export const useGestionPME = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  return {
    activeTab,
    isSidebarOpen,
    setActiveTab,
    setSidebarOpen,
  };
};
