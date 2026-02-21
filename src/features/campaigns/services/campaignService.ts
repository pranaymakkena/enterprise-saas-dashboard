import { Campaign } from "../types";

let campaigns: Campaign[] = Array.from({ length: 50 }).map((_, i) => ({
  id: crypto.randomUUID(),
  name: `Campaign ${i + 1}`,
  status: ["active", "paused", "draft"][i % 3] as any,
  budget: Math.floor(Math.random() * 10000)
}));

export const campaignService = {
  async getCampaigns(
  page: number,
  pageSize: number,
  search = "",
  sortKey: "name" | "budget" | "status" | null = null,
  sortOrder: "asc" | "desc" = "asc",
  filters?: {
    status?: string;
    minBudget?: number;
    maxBudget?: number;
  }
) {
  await new Promise(r => setTimeout(r, 800));

  let filtered = campaigns.filter(c =>
  c.name.toLowerCase().includes(search.toLowerCase())
);

if (filters?.status) {
  filtered = filtered.filter(c => c.status === filters.status);
}

if (filters?.minBudget !== undefined) {
  filtered = filtered.filter(c => c.budget >= filters.minBudget!);
}

if (filters?.maxBudget !== undefined) {
  filtered = filtered.filter(c => c.budget <= filters.maxBudget!);
}

  if (sortKey) {
    filtered = [...filtered].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  const start = (page - 1) * pageSize;

  return {
    data: filtered.slice(start, start + pageSize),
    total: filtered.length
  };
},
  async updateStatus(id: string, status: string) {
    await new Promise(r => setTimeout(r, 500));
    campaigns = campaigns.map(c => c.id === id ? { ...c, status: status as any } : c);
    return { success: true };
  }
};
