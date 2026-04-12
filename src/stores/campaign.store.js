import { create } from "zustand";
import { createCampaign, deleteCampaign, getCampaigns, updateCampaign } from "../api";

export const useCampaignStore = create((set) => ({
  campaigns: [],
  editingCampaignId: null,
  loadCampaigns: () => set({ campaigns: getCampaigns() }),
  setEditingCampaignId: (campaignId) => set({ editingCampaignId: campaignId }),
  clearEditingCampaignId: () => set({ editingCampaignId: null }),
  addCampaign: async (campaign) => {
    const nextCampaign = await createCampaign(campaign);
    set((state) => ({
      campaigns: [...state.campaigns, nextCampaign],
    }));
    return nextCampaign;
  },
  updateCampaign: (campaignId, nextCampaign) => {
    updateCampaign(campaignId, nextCampaign);
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === campaignId ? { ...campaign, ...nextCampaign, id: campaignId } : campaign,
      ),
      editingCampaignId: null,
    }));
  },
  removeCampaign: (campaignId) => {
    deleteCampaign(campaignId);
    set((state) => ({
      campaigns: state.campaigns.filter((campaign) => campaign.id !== campaignId),
      editingCampaignId: state.editingCampaignId === campaignId ? null : state.editingCampaignId,
    }));
  },
}));
