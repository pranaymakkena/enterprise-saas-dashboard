import { useQuery } from "@tanstack/react-query";
import { campaignService } from "../services/campaignService";

export const useCampaigns = (page: number) =>
  useQuery({
    queryKey: ["campaigns", page],
    queryFn: () => campaignService.getCampaigns(page, 10),
    keepPreviousData: true
  });
