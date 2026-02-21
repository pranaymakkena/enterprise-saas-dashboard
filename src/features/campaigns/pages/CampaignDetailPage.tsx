import { useState } from "react";

export default function CampaignDetailPage() {
  const [tab, setTab] = useState("overview");

  const tabs = ["overview", "assets", "performance"];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Campaign Detail</h1>

      <div className="flex gap-6 border-b mb-6">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 text-sm font-medium capitalize transition ${
              tab === t
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        {tab === "overview" && <div>Editable Overview Form</div>}
        {tab === "assets" && <div>Drag & Drop Upload Simulation</div>}
        {tab === "performance" && <div>Performance Charts Section</div>}
      </div>
    </div>
  );
}
