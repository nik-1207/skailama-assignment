import styles from "./campaignTable.module.scss";

const formatCampaignType = (campaignType) => {
  if (campaignType === "number") {
    return "FIXED AMOUNT";
  }

  return "PERCENTAGE";
};

const formatEndDate = (campaign) => {
  if (!campaign.endDateTime) {
    return "-";
  }

  const date = new Date(campaign.endDateTime);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("en-US");
};

const getCampaignStatus = (campaign) => {
  if (!campaign.isEnabled) {
    return "disabled";
  }

  if (campaign.endDateTime) {
    const endDate = new Date(campaign.endDateTime);

    if (!Number.isNaN(endDate.getTime()) && endDate < new Date()) {
      return "expired";
    }
  }

  return "active";
};

const STATUS_LABELS = {
  active: "ACTIVE",
  disabled: "DISABLED",
  expired: "EXPIRED",
};

export const CampaignTable = ({ campaigns, onDelete }) => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Status</th>
            <th>Type</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => {
            const status = getCampaignStatus(campaign);

            return (
              <tr key={campaign.id}>
                <td className={styles.nameCell}>{campaign.campaignName}</td>
                <td>
                  <span className={styles[`status-${status}`]}>{STATUS_LABELS[status]}</span>
                </td>
                <td className={styles.metaCell}>{formatCampaignType(campaign.campaignType)}</td>
                <td className={styles.metaCell}>{formatEndDate(campaign)}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.editButton} type="button">
                      Edit
                    </button>
                    <button className={styles.deleteButton} onClick={() => onDelete(campaign.id)} type="button">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
