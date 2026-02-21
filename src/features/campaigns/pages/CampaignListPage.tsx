import { useState } from "react";
import { useCampaigns } from "../hooks/useCampaigns";

export default function CampaignListPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useCampaigns(page);

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Campaign Management</h1>
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Budget</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map(c => (
            <tr key={c.id} className="border-t">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.status}</td>
              <td className="p-2">${c.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 space-x-2">
        <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>Prev</button>
        <button onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
