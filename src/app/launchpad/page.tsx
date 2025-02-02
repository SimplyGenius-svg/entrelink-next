"use client";

import Sidebar from "./components/Sidebar";
import HeroSection from "./components/HeroSection";
import QuickActions from "./components/QuickActions";
import RecentActivity from "./components/RecentActivity";
import InvestorMatches from "./components/InvestorMatches";
import Events from "./components/Events";

export default function Launchpad() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <HeroSection />
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <QuickActions />
              <RecentActivity />
            </div>
            <div className="space-y-6">
              <InvestorMatches />
              <Events />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
