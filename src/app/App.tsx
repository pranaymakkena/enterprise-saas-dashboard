import { Routes, Route, Navigate } from "react-router-dom";
import CampaignListPage from "@/features/campaigns/pages/CampaignListPage";
import CampaignDetailPage from "@/features/campaigns/pages/CampaignDetailPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/campaigns" />} />
      <Route path="/campaigns" element={<CampaignListPage />} />
      <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
    </Routes>
  );
}
