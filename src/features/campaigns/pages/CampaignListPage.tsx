import { useState } from "react";
import { useCampaigns } from "../hooks/useCampaigns";
import { useDebounce } from "@/shared/hooks/useDebounce";

export default function CampaignListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [filters, setFilters] = useState<{
  status?: string;
  minBudget?: number;
  maxBudget?: number;
}>({});
  const { data, isLoading, isError } = useCampaigns(
  page,
  debouncedSearch,
  sortKey,
  sortOrder,
  filters
);
  const [sortKey, setSortKey] = useState<
  "name" | "budget" | "status" | null
>(null);

const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

const handleSort = (key: "name" | "budget" | "status") => {
  if (sortKey === key) {
    setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
  } else {
    setSortKey(key);
    setSortOrder("asc");
  }
};

  const total = data?.total ?? 0;
  const active = data?.data.filter(c => c.status === "active").length ?? 0;
  const paused = data?.data.filter(c => c.status === "paused").length ?? 0;

  if (isLoading) {
    return <div className="text-gray-500">Loading campaigns...</div>;
  }

  return (
    <div className="space-y-8">

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold">Campaign Management</h1>
        <p className="text-gray-500 text-sm mt-1">
          Monitor and manage your marketing campaigns
        </p>
      </div>
      {/* Search */}
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
<div className="bg-white p-6 rounded-2xl shadow flex flex-wrap gap-4 items-end">

  {/* Status Filter */}
  <div>
    <label className="text-xs text-gray-500 block mb-1">Status</label>
    <select
      className="border rounded-lg px-3 py-2 text-sm"
      onChange={(e) =>
        setFilters(prev => ({
          ...prev,
          status: e.target.value || undefined
        }))
      }
    >
      <option value="">All</option>
      <option value="active">Active</option>
      <option value="paused">Paused</option>
      <option value="draft">Draft</option>
    </select>
  </div>

  {/* Min Budget */}
  <div>
    <label className="text-xs text-gray-500 block mb-1">Min Budget</label>
    <input
      type="number"
      className="border rounded-lg px-3 py-2 text-sm w-32"
      onChange={(e) =>
        setFilters(prev => ({
          ...prev,
          minBudget: e.target.value
            ? Number(e.target.value)
            : undefined
        }))
      }
    />
  </div>

  {/* Max Budget */}
  <div>
    <label className="text-xs text-gray-500 block mb-1">Max Budget</label>
    <input
      type="number"
      className="border rounded-lg px-3 py-2 text-sm w-32"
      onChange={(e) =>
        setFilters(prev => ({
          ...prev,
          maxBudget: e.target.value
            ? Number(e.target.value)
            : undefined
        }))
      }
    />
  </div>

  {/* Reset Button */}
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

      {/* Table */}
      <div className="bg-white shadow rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
  <tr>
    <th
      onClick={() => handleSort("name")}
      className="px-6 py-4 text-left cursor-pointer select-none"
    >
      Name {sortKey === "name" && (sortOrder === "asc" ? "▲" : "▼")}
    </th>

    <th
      onClick={() => handleSort("status")}
      className="px-6 py-4 text-left cursor-pointer select-none"
    >
      Status {sortKey === "status" && (sortOrder === "asc" ? "▲" : "▼")}
    </th>

    <th
      onClick={() => handleSort("budget")}
      className="px-6 py-4 text-left cursor-pointer select-none"
    >
      Budget {sortKey === "budget" && (sortOrder === "asc" ? "▲" : "▼")}
    </th>
  </tr>
</thead>
          <tbody>
            {data?.data.map((campaign) => (
              <tr key={campaign.id} className="border-t hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{campaign.name}</td>
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

      {/* Pagination */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

/* KPI CARD COMPONENT */
function KpiCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-semibold mt-2">{value}</h2>
    </div>
  );
}

/* STATUS BADGE */
function StatusBadge({ status }: { status: string }) {
  const styles = {
    active: "bg-green-100 text-green-700",
    paused: "bg-yellow-100 text-yellow-700",
    draft: "bg-gray-200 text-gray-600"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
      {status}
    </span>
  );
}
