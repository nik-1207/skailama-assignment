import { useEffect } from "react";
import { ROUTE_CREATE_CAMPAIGN, useRouteStore } from "../../stores/route.store";
import { useCampaignStore } from "../../stores/campaign.store";
import { CampaignTable } from "../CampaignTable";
import styles from "./campaigns.module.scss";

export const Campaigns = () => {
  const setRoute = useRouteStore((state) => state.setRoute);
  const campaigns = useCampaignStore((state) => state.campaigns);
  const loadCampaigns = useCampaignStore((state) => state.loadCampaigns);
  const removeCampaign = useCampaignStore((state) => state.removeCampaign);
  const setEditingCampaignId = useCampaignStore((state) => state.setEditingCampaignId);
  const clearEditingCampaignId = useCampaignStore((state) => state.clearEditingCampaignId);

  useEffect(() => {
    loadCampaigns();
  }, [loadCampaigns]);

  const onCreate = () => {
    clearEditingCampaignId();
    setRoute(ROUTE_CREATE_CAMPAIGN);
  };

  const onEdit = (campaignId) => {
    setEditingCampaignId(campaignId);
    setRoute(ROUTE_CREATE_CAMPAIGN);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Campaigns</h1>
        <button className={styles.button} onClick={onCreate}>
          + Create New Campaign
        </button>
      </div>

      <CampaignTable campaigns={campaigns} onDelete={removeCampaign} onEdit={onEdit} />
    </div>
  );
};
