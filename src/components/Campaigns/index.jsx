import { ROUTE_CREATE_CAMPAIGN, useRouteStore } from "../../stores/route.store";
import styles from "./campaigns.module.scss";

export const Campaigns = () => {
  const setRoute = useRouteStore((state) => state.setRoute);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Campaigns</h1>
      <button className={styles.button} onClick={() => setRoute(ROUTE_CREATE_CAMPAIGN)}>
        + Create New Campaign
      </button>
    </div>
  );
};
