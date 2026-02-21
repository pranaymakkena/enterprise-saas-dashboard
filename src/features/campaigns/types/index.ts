export type CampaignStatus = "active" | "paused" | "draft";

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  budget: number;
}
