import { Routes, Route, Navigate, Link } from "react-router-dom";
import CampaignListPage from "@/features/campaigns/pages/CampaignListPage";
import CampaignDetailPage from "@/features/campaigns/pages/CampaignDetailPage";

export default function App() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-6 font-bold text-lg">Enterprise</div>
        <nav className="flex-1 px-4 space-y-2">
          <Link
            to="/campaigns"
            className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Campaigns
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="text-sm text-gray-500">Admin</div>
        </header>

        <main className="p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/campaigns" />} />
            <Route path="/campaigns" element={<CampaignListPage />} />
            <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
