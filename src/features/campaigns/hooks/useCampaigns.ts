import { useQuery } from "@tanstack/react-query";
import { campaignService } from "../services/campaignService";

export const useCampaigns = (page: number, search: string) =>
  useQuery({
    queryKey: ["campaigns", page, search],
    queryFn: () => campaignService.getCampaigns(page, 10, search),
    keepPreviousData: true
  });
