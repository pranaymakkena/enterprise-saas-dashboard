import { useState } from "react";
import { useCampaigns } from "../hooks/useCampaigns";

export default function CampaignListPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useCampaigns(page);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-500">Loading campaigns...</div>
      </div>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Campaign Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + Create Campaign
        </button>
      </div>

      <div className="bg-white shadow rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Budget</th>
            </tr>
          </thead>

          <tbody>
            {data?.data.map((campaign) => (
              <tr
                key={campaign.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {campaign.name}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status === "active"
                        ? "bg-green-100 text-green-700"
                        : campaign.status === "paused"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </td>

                <td className="px-6 py-4 font-medium text-gray-800">
                  ${campaign.budget.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 hover:bg-gray-50"
        >
          Previous
        </button>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
