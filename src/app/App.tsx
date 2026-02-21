import { Routes, Route, Navigate, Link } from "react-router-dom";
import CampaignListPage from "@/features/campaigns/pages/CampaignListPage";
import CampaignDetailPage from "@/features/campaigns/pages/CampaignDetailPage";

export default function App() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">SaaS Dashboard</h2>
        <nav className="space-y-3">
          <Link
            to="/campaigns"
            className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Campaigns
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/campaigns" />} />
          <Route path="/campaigns" element={<CampaignListPage />} />
          <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}
