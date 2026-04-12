import { create } from "zustand";
import { createCampaign, deleteCampaign, getCampaigns, updateCampaign } from "../api";

export const useCampaignStore = create((set) => ({
  campaigns: [],
  editingCampaignId: null,
  loadCampaigns: async () => {
    const campaigns = await getCampaigns();
    set({ campaigns: campaigns.data });
  },
  setEditingCampaignId: (campaignId) => set({ editingCampaignId: campaignId }),
  clearEditingCampaignId: () => set({ editingCampaignId: null }),
  addCampaign: async (campaign) => {
    const nextCampaign = await createCampaign(campaign);
    set((state) => ({
      campaigns: [...state.campaigns, nextCampaign.data],
    }));
    return nextCampaign;
  },
  updateCampaign: (campaignId, nextCampaign) => {
    updateCampaign(campaignId, nextCampaign);
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign._id === campaignId ? { ...campaign, ...nextCampaign, _id: campaignId } : campaign,
      ),
      editingCampaignId: null,
    }));
  },
  removeCampaign: async (campaignId) => {
    await deleteCampaign(campaignId);
    set((state) => ({
      campaigns: state.campaigns.filter((campaign) => campaign._id !== campaignId),
      editingCampaignId: state.editingCampaignId === campaignId ? null : state.editingCampaignId,
    }));
  },
}));
