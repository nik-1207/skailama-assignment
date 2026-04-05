import { Card } from "../Card";
import { useShopStore } from "../../stores/shop.store";
import styles from "./createCampaign.module.scss";
import { TIMEZONE_OPTIONS } from "../utils";

export const CreateCampaign = () => {
  const activeShop = useShopStore((state) => state.activeShop);

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
    </div>
  );
};
