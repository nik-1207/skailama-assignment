import { useEffect, useState } from "react";
import { Card } from "../Card";
import { useShopStore } from "../../stores/shop.store";
import styles from "./createCampaign.module.scss";
import { TIMEZONE_OPTIONS } from "../utils";

export const CreateCampaign = () => {
  const activeShop = useShopStore((state) => state.activeShop);
  const timezone = activeShop?.timezone ?? TIMEZONE_OPTIONS[0];
  const [values, setValues] = useState({
    campaignName: "",
    campaignType: "percentage",
    timezone,
    campaignSchedule: "scheduled",
    startDateTime: "",
    endDateTime: "",
  });

  useEffect(() => {
    setValues((current) => ({
      ...current,
      timezone,
    }));
  }, [timezone]);

  const onChange = (event) => {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const isScheduled = values.campaignSchedule === "scheduled";

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <Card className={styles.card}>
        <h1 className={styles.title}>Core Details</h1>
        <div className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="campaignName">Campaign Name</label>
            <input
              id="campaignName"
              name="campaignName"
              type="text"
              value={values.campaignName}
              onChange={onChange}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="campaignType">Campaign Type</label>
            <select id="campaignType" name="campaignType" value={values.campaignType} onChange={onChange}>
              <option value="percentage">Percentage</option>
              <option value="number">Number</option>
            </select>
          </div>
          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="timezone">Campaign Timezone</label>
            <select id="timezone" name="timezone" value={values.timezone} onChange={onChange}>
              {Array.from(new Set([timezone, ...TIMEZONE_OPTIONS].filter(Boolean))).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <Card className={styles.card}>
        <h1 className={styles.title}>Timing &amp; Schedule ({timezone})</h1>

        <div className={styles.scheduleSection}>
          <span className={styles.label}>Campaign Schedule</span>
          <div className={styles.radioRow}>
            <label className={styles.radioOption}>
              <input
                checked={values.campaignSchedule === "continuous"}
                name="campaignSchedule"
                onChange={onChange}
                type="radio"
                value="continuous"
              />
              <span>Run campaign continuously</span>
            </label>
            <label className={styles.radioOption}>
              <input
                checked={values.campaignSchedule === "scheduled"}
                name="campaignSchedule"
                onChange={onChange}
                type="radio"
                value="scheduled"
              />
              <span>Run campaign on a schedule</span>
            </label>
          </div>

          {isScheduled ? (
            <div className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="startDateTime">Start Date &amp; Time</label>
                <input
                  id="startDateTime"
                  name="startDateTime"
                  type="datetime-local"
                  value={values.startDateTime}
                  onChange={onChange}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="endDateTime">End Date &amp; Time</label>
                <input
                  id="endDateTime"
                  name="endDateTime"
                  type="datetime-local"
                  value={values.endDateTime}
                  onChange={onChange}
                />
              </div>
            </div>
          ) : null}
        </div>
      </Card>
    </form>
  );
};
