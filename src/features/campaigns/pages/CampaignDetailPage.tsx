import { useState } from "react";

export default function CampaignDetailPage() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Campaign Detail</h1>
      <div className="flex gap-4 border-b mb-4">
        {["overview", "assets", "performance"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={tab === t ? "border-b-2 border-blue-500 pb-1" : ""}>
            {t}
          </button>
        ))}
      </div>
      <div>
        {tab === "overview" && <div>Editable Overview Form</div>}
        {tab === "assets" && <div>Asset Upload Simulation</div>}
        {tab === "performance" && <div>Performance Charts</div>}
      </div>
    </div>
  );
}
