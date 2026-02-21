import { useState } from "react";
import { useCampaigns } from "../hooks/useCampaigns";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useSelectionStore } from "@/store/useSelectionStore";

export default function CampaignListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const [sortKey, setSortKey] = useState<
    "name" | "budget" | "status" | null
  >(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [filters, setFilters] = useState<{
    status?: string;
    minBudget?: number;
    maxBudget?: number;
  }>({});

  const { selectedIds, toggle, selectAll, clear } = useSelectionStore();

  const { data, isLoading, isError } = useCampaigns(
    page,
    debouncedSearch,
    sortKey,
    sortOrder,
    filters
  );

  const handleSort = (key: "name" | "budget" | "status") => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  if (isLoading) {
    return <div className="text-gray-500">Loading campaigns...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Failed to load campaigns. Please try again.
      </div>
    );
  }

  if (!data?.data.length) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">
        No campaigns found.
      </div>
    );
  }

  const total = data.total;
  const active = data.data.filter((c) => c.status === "active").length;
  const paused = data.data.filter((c) => c.status === "paused").length;

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Campaign Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            Monitor and manage your marketing campaigns
          </p>
        </div>

        <input
          type="text"
          placeholder="Search campaigns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* FILTER PANEL */}
      <div className="bg-white p-6 rounded-2xl shadow flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Status</label>
          <select
            className="border rounded-lg px-3 py-2 text-sm"
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                status: e.target.value || undefined,
              }))
            }
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Min Budget</label>
          <input
            type="number"
            className="border rounded-lg px-3 py-2 text-sm w-32"
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                minBudget: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              }))
            }
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">Max Budget</label>
          <input
            type="number"
            className="border rounded-lg px-3 py-2 text-sm w-32"
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                maxBudget: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              }))
            }
          />
        </div>

        <button
          onClick={() => setFilters({})}
          className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
        >
          Reset
        </button>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard title="Total Campaigns" value={total} />
        <KpiCard title="Active Campaigns" value={active} />
        <KpiCard title="Paused Campaigns" value={paused} />
      </div>

      {/* BULK ACTION BAR */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex justify-between items-center">
          <span className="text-sm text-blue-700">
            {selectedIds.length} selected
          </span>
          <button
            onClick={() => {
              alert("Bulk action simulated");
              clear();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            Run Bulk Action
          </button>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white shadow rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={
                    data.data.length > 0 &&
                    selectedIds.length === data.data.length
                  }
                  onChange={(e) =>
                    e.target.checked
                      ? selectAll(data.data.map((c) => c.id))
                      : clear()
                  }
                />
              </th>

              <th
                onClick={() => handleSort("name")}
                className="px-6 py-4 text-left cursor-pointer"
              >
                Name {sortKey === "name" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>

              <th
                onClick={() => handleSort("status")}
                className="px-6 py-4 text-left cursor-pointer"
              >
                Status {sortKey === "status" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>

              <th
                onClick={() => handleSort("budget")}
                className="px-6 py-4 text-left cursor-pointer"
              >
                Budget {sortKey === "budget" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
            </tr>
          </thead>

          <tbody>
            {data.data.map((campaign) => (
              <tr
                key={campaign.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(campaign.id)}
                    onChange={() => toggle(campaign.id)}
                  />
                </td>

                <td className="px-6 py-4 font-medium">
                  {campaign.name}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={campaign.status} />
                </td>

                <td className="px-6 py-4 font-medium">
                  ₹{campaign.budget.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-white border rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function KpiCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-semibold mt-2">{value}</h2>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    active: "bg-green-100 text-green-700",
    paused: "bg-yellow-100 text-yellow-700",
    draft: "bg-gray-200 text-gray-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[status as keyof typeof styles]
      }`}
    >
      {status}
    </span>
  );
}
