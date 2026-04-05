import styles from "./campaigns.module.scss";

export const Campaigns = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Campaigns</h1>
      <button className={styles.button}>
        + Create New Campaign
      </button>
    </div>
  );
};
