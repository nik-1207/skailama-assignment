import { Card } from "../Card";
import { useShopStore } from "../../stores/shop.store";
import styles from "./createCampaign.module.scss";
import { TIMEZONE_OPTIONS } from "../utils";

export const CreateCampaign = () => {
  const activeShop = useShopStore((state) => state.activeShop);
  const isScheduled = true;

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1 className={styles.title}>Core Details</h1>
        <div className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="campaignName">Campaign Name</label>
            <input id="campaignName" name="campaignName" type="text" />
          </div>

          <div className={styles.field}>
            <label htmlFor="campaignType">Campaign Type</label>
            <select id="campaignType" name="campaignType" defaultValue="percentage">
              <option value="percentage">Percentage</option>
              <option value="number">Number</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="timezone">Campaign Timezone</label>
            <select id="timezone" name="timezone" defaultValue={activeShop?.timezone ?? TIMEZONE_OPTIONS[0]}>
              {Array.from(new Set([activeShop?.timezone, ...TIMEZONE_OPTIONS].filter(Boolean))).map((timezone) => (
                <option key={timezone} value={timezone}>
                  {timezone}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <Card className={styles.card}>
        <h1 className={styles.title}>Timing &amp; Schedule ({activeShop?.timezone ?? "UTC"})</h1>

        <div className={styles.scheduleSection}>
          <span className={styles.label}>Campaign Schedule</span>
          <div className={styles.radioRow}>
            <label className={styles.radioOption}>
              <input checked={!isScheduled} name="campaignSchedule" readOnly type="radio" />
              <span>Run campaign continuously</span>
            </label>
            <label className={styles.radioOption}>
              <input checked={isScheduled} name="campaignSchedule" readOnly type="radio" />
              <span>Run campaign on a schedule</span>
            </label>
          </div>

          {isScheduled ? (
            <div className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="startDateTime">Start Date &amp; Time</label>
                <input id="startDateTime" name="startDateTime" type="datetime-local" />
              </div>

              <div className={styles.field}>
                <label htmlFor="endDateTime">End Date &amp; Time</label>
                <input id="endDateTime" name="endDateTime" type="datetime-local" />
              </div>
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
};
