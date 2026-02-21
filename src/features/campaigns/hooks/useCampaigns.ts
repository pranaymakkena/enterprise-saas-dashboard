import { useQuery } from "@tanstack/react-query";
import { campaignService } from "../services/campaignService";

export const useCampaigns = (
  page: number,
  search: string,
  sortKey: "name" | "budget" | "status" | null,
  sortOrder: "asc" | "desc",
  filters: {
    status?: string;
    minBudget?: number;
    maxBudget?: number;
  }
) =>
  useQuery({
    queryKey: ["campaigns", page, search, sortKey, sortOrder, filters],
    queryFn: () =>
      campaignService.getCampaigns(
        page,
        10,
        search,
        sortKey,
        sortOrder,
        filters
      ),
    keepPreviousData: true,
    staleTime: 5000
  });
