
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import MetricsOverview from "@/components/MetricsOverview";
import PropertyPortfolio from "@/components/PropertyPortfolio";
import FinancialSummary from "@/components/FinancialSummary";
import RecentActivities from "@/components/RecentActivities";
import QuickActions from "@/components/QuickActions";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Real Estate Management Dashboard</h1>
              <p className="text-muted-foreground">Comprehensive overview of your property portfolio and operations</p>
            </div>
            
            <MetricsOverview />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <PropertyPortfolio />
                <FinancialSummary />
              </div>
              
              <div className="space-y-6">
                <QuickActions />
                <RecentActivities />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
