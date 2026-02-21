import { Campaign } from "../types";

let campaigns: Campaign[] = Array.from({ length: 50 }).map((_, i) => ({
  id: crypto.randomUUID(),
  name: `Campaign ${i + 1}`,
  status: ["active", "paused", "draft"][i % 3] as any,
  budget: Math.floor(Math.random() * 10000)
}));

export const campaignService = {
  async getCampaigns(page: number, pageSize: number, search = "") {
  await new Promise(r => setTimeout(r, 800));

  const filtered = campaigns.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

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
