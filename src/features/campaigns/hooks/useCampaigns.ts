import { useQuery } from "@tanstack/react-query";
import { campaignService } from "../services/campaignService";

export const useCampaigns = (
  page: number,
  search: string,
  sortKey: "name" | "budget" | "status" | null,
  sortOrder: "asc" | "desc"
) =>
  useQuery({
    queryKey: ["campaigns", page, search, sortKey, sortOrder],
    queryFn: () =>
      campaignService.getCampaigns(page, 10, search, sortKey, sortOrder),
    keepPreviousData: true
  });
