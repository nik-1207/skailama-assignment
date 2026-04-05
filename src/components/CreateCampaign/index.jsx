import { useEffect, useState } from "react";
import { ChevronDown, CircleHelp, Plus, Trash2 } from "lucide-react";
import { Card } from "../Card";
import { useShopStore } from "../../stores/shop.store";
import { RuleSelectionModal } from "./RuleSelectionModal";
import styles from "./createCampaign.module.scss";
import { TIMEZONE_OPTIONS } from "../utils";

export const CreateCampaign = () => {
  const activeShop = useShopStore((state) => state.activeShop);
  const timezone = activeShop?.timezone ?? TIMEZONE_OPTIONS[0];
  const initialTierId = crypto.randomUUID();
  const [values, setValues] = useState({
    storeId: activeShop?.id ?? "",
    campaignName: "",
    campaignType: "percentage",
    timezone,
    campaignSchedule: "scheduled",
    startDateTime: null,
    endDateTime: null,
    deliveryMode: "immediate",
    deliveryDays: null,
    expirationMode: "never",
    expirationDays: null,
    expiryTime: null,
    tiers: [
      {
        id: initialTierId,
        name: "Tier 1",
        cashbackValue: "100",
        rules: [],
      },
    ],
  });
  const [openTierIds, setOpenTierIds] = useState([initialTierId]);
  const [ruleModalTierId, setRuleModalTierId] = useState(null);

  useEffect(() => {
    setValues((current) => ({
      ...current,
      storeId: activeShop?.id ?? "",
      timezone,
    }));
  }, [activeShop, timezone]);

  const onChange = (event) => {
    const { name, value } = event.target;

    setValues((current) => {
      if (name === "campaignSchedule") {
        return {
          ...current,
          campaignSchedule: value,
          startDateTime: value === "scheduled" ? current.startDateTime ?? "" : null,
          endDateTime: value === "scheduled" ? current.endDateTime ?? "" : null,
        };
      }

      if (name === "deliveryMode") {
        return {
          ...current,
          deliveryMode: value,
          deliveryDays: value === "after-specified-days" ? current.deliveryDays ?? "7" : null,
        };
      }

      if (name === "expirationMode") {
        return {
          ...current,
          expirationMode: value,
          expirationDays: value === "after-specified-days" ? current.expirationDays ?? "90" : null,
          expiryTime: value === "after-specified-days" ? current.expiryTime ?? "10:00" : null,
        };
      }

      return {
        ...current,
        [name]: value,
      };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const isScheduled = values.campaignSchedule === "scheduled";
  const hasDeliveryDays = values.deliveryMode === "after-specified-days";
  const hasExpiryDays = values.expirationMode === "after-specified-days";
  const hasMaxTiers = values.tiers.length >= 5;
  const cashbackUnit = values.campaignType === "percentage" ? "%" : "$";

  const addTier = () => {
    if (hasMaxTiers) {
      return;
    }

    const nextTierId = crypto.randomUUID();

    setValues((current) => ({
      ...current,
      tiers: [
        ...current.tiers,
        {
          id: nextTierId,
          name: `Tier ${current.tiers.length + 1}`,
          cashbackValue: "",
          rules: [],
        },
      ],
    }));

    setOpenTierIds((current) => [...current, nextTierId]);
  };

  const updateTier = (tierId, key, value) => {
    setValues((current) => ({
      ...current,
      tiers: current.tiers.map((tier) => (tier.id === tierId ? { ...tier, [key]: value } : tier)),
    }));
  };

  const deleteTier = (tierId) => {
    setValues((current) => ({
      ...current,
      tiers: current.tiers.filter((tier) => tier.id !== tierId),
    }));
    setOpenTierIds((current) => current.filter((id) => id !== tierId));
  };

  const toggleTier = (tierId) => {
    setOpenTierIds((current) =>
      current.includes(tierId) ? current.filter((id) => id !== tierId) : [...current, tierId],
    );
  };

  const closeRuleModal = () => {
    setRuleModalTierId(null);
  };

  return (
    <>
      <form className={styles.container} onSubmit={onSubmit}>
        <Card className={styles.card}>
          <h1 className={styles.title}>Core Details</h1>
          <div className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="campaignName">Campaign Name</label>
              <input
                id="campaignName"
                name="campaignName"
                onChange={onChange}
                type="text"
                value={values.campaignName}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="campaignType">Campaign Type</label>
              <select id="campaignType" name="campaignType" onChange={onChange} value={values.campaignType}>
                <option value="percentage">Percentage</option>
                <option value="number">Number</option>
              </select>
            </div>

            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label htmlFor="timezone">Campaign Timezone</label>
              <select id="timezone" name="timezone" onChange={onChange} value={values.timezone}>
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
          <h1 className={styles.title}>Timing &amp; Schedule ({values.timezone})</h1>

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
                    onChange={onChange}
                    type="datetime-local"
                    value={values.startDateTime ?? ""}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="endDateTime">End Date &amp; Time</label>
                  <input
                    id="endDateTime"
                    name="endDateTime"
                    onChange={onChange}
                    type="datetime-local"
                    value={values.endDateTime ?? ""}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </Card>

        <Card className={styles.card}>
          <h1 className={styles.title}>Cashback Details and Expiry</h1>

          <div className={styles.expirySection}>
            <div className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="deliveryMode">Delivery Mode</label>
                <select id="deliveryMode" name="deliveryMode" onChange={onChange} value={values.deliveryMode}>
                  <option value="immediate">Immediate</option>
                  <option value="after-specified-days">After Specified Days</option>
                </select>
              </div>

              {hasDeliveryDays ? (
                <div className={styles.field}>
                  <label htmlFor="deliveryDays">Delivery Days</label>
                  <input
                    id="deliveryDays"
                    name="deliveryDays"
                    onChange={onChange}
                    type="number"
                    value={values.deliveryDays ?? ""}
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.expirySection}>
            <div className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="expirationMode">Expiration Mode</label>
                <select
                  id="expirationMode"
                  name="expirationMode"
                  onChange={onChange}
                  value={values.expirationMode}
                >
                  <option value="never">Never</option>
                  <option value="after-specified-days">After Specified Days</option>
                </select>
              </div>

              {hasExpiryDays ? (
                <div className={styles.field}>
                  <label htmlFor="expirationDays">Expiration Days</label>
                  <input
                    id="expirationDays"
                    name="expirationDays"
                    onChange={onChange}
                    type="number"
                    value={values.expirationDays ?? ""}
                  />
                </div>
              ) : null}

              {hasExpiryDays ? (
                <div className={styles.field}>
                  <label htmlFor="expiryTime">Expiry Time ({values.timezone})</label>
                  <input
                    id="expiryTime"
                    name="expiryTime"
                    onChange={onChange}
                    type="time"
                    value={values.expiryTime ?? ""}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </Card>

        <Card className={styles.card}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleWrap}>
              <h1 className={styles.sectionTitle}>Campaign Eligibility Rules</h1>
              <CircleHelp className={styles.sectionIcon} size={18} />
            </div>

            <button className={styles.tierButton} disabled={hasMaxTiers} onClick={addTier} type="button">
              <Plus size={18} />
              <span>Add tiers</span>
            </button>
          </div>

          <div className={styles.tiers}>
            {values.tiers.map((tier) => (
              <section className={styles.tierCard} key={tier.id}>
                <div className={styles.tierHeader}>
                  <button className={styles.tierToggle} onClick={() => toggleTier(tier.id)} type="button">
                    <ChevronDown
                      className={openTierIds.includes(tier.id) ? styles.chevronOpen : styles.chevronClosed}
                      size={18}
                    />
                    <span>{tier.name}</span>
                  </button>

                  <div className={styles.tierActions}>
                    <button className={styles.iconButton} onClick={() => deleteTier(tier.id)} type="button">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {openTierIds.includes(tier.id) ? (
                  <div className={styles.tierBody}>
                    <div className={styles.ruleHeader}>
                      <span className={styles.label}>Eligibility rules</span>
                      <button className={styles.ruleButton} onClick={() => setRuleModalTierId(tier.id)} type="button">
                        <Plus size={18} />
                        <span>Add rule</span>
                      </button>
                    </div>

                    {tier.rules?.length ? (
                      <div className={styles.ruleList}>
                        {tier.rules.map((rule) => (
                          <div className={styles.ruleItem} key={rule.id}>
                            <span className={styles.ruleName}>{rule.field}</span>
                            <span className={styles.ruleMeta}>{rule.type} - {rule.operator}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <div className={styles.field}>
                      <label htmlFor={`cashbackValue-${tier.id}`}>Cashback value</label>
                      <div className={styles.valueField}>
                        {values.campaignType === "number" ? (
                          <span className={styles.valueAffix}>{cashbackUnit}</span>
                        ) : null}

                        <input
                          id={`cashbackValue-${tier.id}`}
                          name={`cashbackValue-${tier.id}`}
                          onChange={(event) => updateTier(tier.id, "cashbackValue", event.target.value)}
                          type="text"
                          value={tier.cashbackValue}
                        />

                        {values.campaignType === "percentage" ? (
                          <span className={styles.valueAffix}>{cashbackUnit}</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ) : null}
              </section>
            ))}
          </div>
        </Card>
      </form>

      <RuleSelectionModal onClose={closeRuleModal} open={Boolean(ruleModalTierId)} />
    </>
  );
};
