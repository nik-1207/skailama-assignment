import { create } from "zustand";
import { createCampaign, deleteCampaign, getCampaigns } from "../api";

export const useCampaignStore = create((set) => ({
  campaigns: [],
  loadCampaigns: () => set({ campaigns: getCampaigns() }),
  addCampaign: (campaign) => {
    const nextCampaign = createCampaign(campaign);
    set((state) => ({
      campaigns: [...state.campaigns, nextCampaign],
    }));
    return nextCampaign;
  },
  removeCampaign: (campaignId) => {
    deleteCampaign(campaignId);
    set((state) => ({
      campaigns: state.campaigns.filter((campaign) => campaign.id !== campaignId),
    }));
  },
}));
