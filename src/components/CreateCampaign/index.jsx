import { useEffect, useMemo, useState } from "react";
import { ChevronDown, CircleHelp, Plus, Trash2 } from "lucide-react";
import { Card } from "../Card";
import { useCampaignStore } from "../../stores/campaign.store";
import { useCollectionStore } from "../../stores/collection.store";
import { useCustomerTagStore } from "../../stores/customerTag.store";
import { useProductStore } from "../../stores/product.store";
import { ROUTE_CAMPAIGNS, useRouteStore } from "../../stores/route.store";
import { useShopStore } from "../../stores/shop.store";
import { RuleInputRenderer } from "./RuleInputRenderer";
import { RuleSelectionModal } from "./RuleSelectionModal";
import { createCampaignRuleDraft, buildCampaignRuleLogic, getInitialValues, resolveCreateCampaign } from "./utils";
import styles from "./createCampaign.module.scss";
import { CURRENCY_OPTIONS, TIMEZONE_OPTIONS } from "../utils";

export const CreateCampaign = () => {
  const activeShop = useShopStore((state) => state.activeShop);
  const campaigns = useCampaignStore((state) => state.campaigns);
  const loadCampaigns = useCampaignStore((state) => state.loadCampaigns);
  const editingCampaignId = useCampaignStore((state) => state.editingCampaignId);
  const addCampaign = useCampaignStore((state) => state.addCampaign);
  const saveCampaign = useCampaignStore((state) => state.updateCampaign);
  const clearEditingCampaignId = useCampaignStore((state) => state.clearEditingCampaignId);
  const collections = useCollectionStore((state) => state.collections);
  const loadCollections = useCollectionStore((state) => state.loadCollections);
  const customerTags = useCustomerTagStore((state) => state.customerTags);
  const loadCustomerTags = useCustomerTagStore((state) => state.loadCustomerTags);
  const products = useProductStore((state) => state.products);
  const loadProducts = useProductStore((state) => state.loadProducts);
  const setRoute = useRouteStore((state) => state.setRoute);

  const timezone = activeShop?.timezone ?? TIMEZONE_OPTIONS[0];
  const editingCampaign = campaigns.find((campaign) => campaign.id === editingCampaignId) ?? null;
  const initialValues = useMemo(
    () => getInitialValues({ activeShop, editingCampaign, timezone }),
    [activeShop, editingCampaign, timezone],
  );
  const [values, setValues] = useState(initialValues);
  const [openTierIds, setOpenTierIds] = useState(initialValues.tiers.map((tier) => tier.id));
  const [ruleModalTierId, setRuleModalTierId] = useState(null);
  const [errors, setErrors] = useState({});

  const getError = (path) => errors[path];
  const clearError = (path) => {
    setErrors((current) => ({
      ...current,
      [path]: undefined,
    }));
  };
  const clearTierErrors = () => clearError("tiers");

  useEffect(() => {
    loadCampaigns();
    loadCollections();
    loadCustomerTags();
    loadProducts();
  }, [loadCampaigns, loadCollections, loadCustomerTags, loadProducts]);

  useEffect(() => {
    setValues(initialValues);
    setOpenTierIds(initialValues.tiers.map((tier) => tier.id));
    setErrors({});
  }, [initialValues]);

  const onChange = (event) => {
    const { name, value } = event.target;

    setValues((current) => {
      if (name === "campaignSchedule") {
        clearError("campaignSchedule");
        clearError("startDateTime");
        clearError("endDateTime");
        return {
          ...current,
          campaignSchedule: value,
          startDateTime: value === "scheduled" ? current.startDateTime ?? "" : null,
          endDateTime: value === "scheduled" ? current.endDateTime ?? "" : null,
        };
      }

      if (name === "deliveryMode") {
        clearError("deliveryMode");
        clearError("deliveryDays");
        return {
          ...current,
          deliveryMode: value,
          deliveryDays: value === "after-specified-days" ? current.deliveryDays ?? "7" : null,
        };
      }

      if (name === "expirationMode") {
        clearError("expirationMode");
        clearError("expirationDays");
        clearError("expiryTime");
        return {
          ...current,
          expirationMode: value,
          expirationDays: value === "after-specified-days" ? current.expirationDays ?? "90" : null,
          expiryTime: value === "after-specified-days" ? current.expiryTime ?? "10:00" : null,
        };
      }

      clearError(name);

      return {
        ...current,
        [name]: value,
      };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const result = resolveCreateCampaign(values);
    setErrors(result.errors);

    if (!result.values) {
      return;
    }

    if (editingCampaignId) {
      saveCampaign(editingCampaignId, result.values);
    } else {
      addCampaign(result.values);
    }

    clearEditingCampaignId();
    setRoute(ROUTE_CAMPAIGNS);
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
          matchType: "and",
          rules: [],
        },
      ],
    }));
    clearTierErrors();

    setOpenTierIds((current) => [...current, nextTierId]);
  };

  const updateTier = (tierId, key, value) => {
    clearTierErrors();
    setValues((current) => ({
      ...current,
      tiers: current.tiers.map((tier) => (tier.id === tierId ? { ...tier, [key]: value } : tier)),
    }));
  };

  const deleteTier = (tierId) => {
    clearTierErrors();
    setValues((current) => ({
      ...current,
      tiers: current.tiers.filter((tier) => tier.id !== tierId),
    }));
    setOpenTierIds((current) => current.filter((id) => id !== tierId));
  };

  const updateRule = (tierId, ruleId, key, value) => {
    clearTierErrors();
    setValues((current) => ({
      ...current,
      tiers: current.tiers.map((tier) =>
        tier.id === tierId
          ? {
              ...tier,
              rules: tier.rules.map((rule) => {
                if (rule.id !== ruleId) {
                  return rule;
                }

                const nextRule = { ...rule, [key]: value };

                return {
                  ...nextRule,
                  logic: buildCampaignRuleLogic(nextRule),
                };
              }),
            }
          : tier,
      ),
    }));
  };

  const deleteRule = (tierId, ruleId) => {
    clearTierErrors();
    setValues((current) => ({
      ...current,
      tiers: current.tiers.map((tier) =>
        tier.id === tierId
          ? {
              ...tier,
              rules: tier.rules.filter((rule) => rule.id !== ruleId),
            }
          : tier,
      ),
    }));
  };

  const toggleTier = (tierId) => {
    setOpenTierIds((current) =>
      current.includes(tierId) ? current.filter((id) => id !== tierId) : [...current, tierId],
    );
  };

  const closeRuleModal = () => {
    setRuleModalTierId(null);
  };

  const customerTagOptions = customerTags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  const currencyOptions = CURRENCY_OPTIONS.map((currency) => ({
    value: currency,
    label: currency,
  }));

  const productTagOptions = useMemo(
    () =>
      Array.from(
        new Map(
          products
            .flatMap((product) => product.tags ?? [])
            .map((tag) => [tag._id, { value: tag._id, label: tag.name }]),
        ).values(),
      ),
    [products],
  );

  const productOptions = useMemo(
    () =>
      Array.from(
        new Map(products.map((product) => [product._id, { value: product._id, label: product.name }])).values(),
      ),
    [products],
  );

  const variantOptions = useMemo(
    () =>
      Array.from(
        new Map(
          products
            .flatMap((product) => product.variants ?? [])
            .map((variant) => [variant._id, { value: variant._id, label: variant.name }]),
        ).values(),
      ),
    [products],
  );

  const productCollectionOptions = useMemo(
    () =>
      Array.from(
        new Map(
          collections
            .filter(Boolean)
            .map((collection) => [collection._id, { value: collection._id, label: collection.name }]),
        ).values(),
      ),
    [collections],
  );

  const productTypeOptions = useMemo(
    () =>
      Array.from(
        new Map(
          products
            .map((product) => product.productType)
            .filter(Boolean)
            .map((productType) => [productType._id, { value: productType._id, label: productType.name }]),
        ).values(),
      ),
    [products],
  );

  const addRuleToTier = (field) => {
    if (!ruleModalTierId) {
      return;
    }

    const draft = createCampaignRuleDraft(field);

    if (!draft) {
      setRuleModalTierId(null);
      return;
    }

    setValues((current) => ({
      ...current,
      tiers: current.tiers.map((tier) =>
        tier.id === ruleModalTierId
          ? {
              ...tier,
              rules: [...tier.rules, draft],
            }
          : tier,
      ),
    }));
    clearTierErrors();

    setRuleModalTierId(null);
  };

  return (
    <>
      <form className={styles.container} onSubmit={onSubmit}>
        <Card className={styles.card}>
          <div className={styles.statusRow}>
            <div className={styles.statusContent}>
              <h1 className={styles.statusTitle}>Campaign Status</h1>
              <span className={styles.statusText}>{values.isEnabled ? "Enabled" : "Disabled"}</span>
            </div>

            <button
              className={values.isEnabled ? styles.statusToggleActive : styles.statusToggle}
              onClick={() => setValues((current) => ({ ...current, isEnabled: !current.isEnabled }))}
              type="button"
            >
              <span className={styles.statusThumb} />
            </button>
          </div>
        </Card>

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
              {errors.campaignName ? <p className={styles.error}>{errors.campaignName}</p> : null}
            </div>

            <div className={styles.field}>
              <label htmlFor="campaignType">Campaign Type</label>
              <select id="campaignType" name="campaignType" onChange={onChange} value={values.campaignType}>
                <option value="percentage">Percentage</option>
                <option value="number">Number</option>
              </select>
              {errors.campaignType ? <p className={styles.error}>{errors.campaignType}</p> : null}
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
              {errors.timezone ? <p className={styles.error}>{errors.timezone}</p> : null}
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
            {errors.campaignSchedule ? <p className={styles.error}>{errors.campaignSchedule}</p> : null}

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
                  {errors.startDateTime ? <p className={styles.error}>{errors.startDateTime}</p> : null}
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
                  {errors.endDateTime ? <p className={styles.error}>{errors.endDateTime}</p> : null}
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
                {errors.deliveryMode ? <p className={styles.error}>{errors.deliveryMode}</p> : null}
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
                  {errors.deliveryDays ? <p className={styles.error}>{errors.deliveryDays}</p> : null}
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
                {errors.expirationMode ? <p className={styles.error}>{errors.expirationMode}</p> : null}
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
                  {errors.expirationDays ? <p className={styles.error}>{errors.expirationDays}</p> : null}
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
                  {errors.expiryTime ? <p className={styles.error}>{errors.expiryTime}</p> : null}
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

          {errors.tiers ? <p className={styles.error}>{errors.tiers}</p> : null}

          <div className={styles.tiers}>
            {values.tiers.map((tier, tierIndex) => (
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
                      <div className={styles.ruleHeaderLeft}>
                        <span className={styles.label}>Eligibility rules</span>
                        {tier.rules.length ? (
                          <div className={styles.matchControl}>
                            <span className={styles.matchLabel}>Match:</span>
                            <div className={styles.matchTabs}>
                              <button
                                className={tier.matchType === "and" ? styles.matchTabActive : styles.matchTab}
                                onClick={() => updateTier(tier.id, "matchType", "and")}
                                type="button"
                              >
                                AND
                              </button>
                              <button
                                className={tier.matchType === "or" ? styles.matchTabActive : styles.matchTab}
                                onClick={() => updateTier(tier.id, "matchType", "or")}
                                type="button"
                              >
                                OR
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <button className={styles.ruleButton} onClick={() => setRuleModalTierId(tier.id)} type="button">
                        <Plus size={18} />
                        <span>Add rule</span>
                      </button>
                    </div>
                    {getError(`tiers.${tierIndex}.rules`) ? (
                      <p className={styles.error}>{getError(`tiers.${tierIndex}.rules`)}</p>
                    ) : null}

                    {tier.rules?.length ? (
                      <div className={styles.ruleList}>
                        {tier.rules.map((rule, ruleIndex) => (
                          <RuleInputRenderer
                            key={rule.id}
                            currencyOptions={currencyOptions}
                            onDelete={() => deleteRule(tier.id, rule.id)}
                            onOperatorChange={(event) => updateRule(tier.id, rule.id, "operator", event.target.value)}
                            onValueChange={(nextValue) =>
                              updateRule(
                                tier.id,
                                rule.id,
                                "value",
                                Array.isArray(nextValue) ? nextValue : nextValue.target.value,
                              )
                            }
                            rule={rule}
                            ruleError={
                              getError(`tiers.${tierIndex}.rules.${ruleIndex}.logic`) ||
                              getError(`tiers.${tierIndex}.rules.${ruleIndex}.value`) ||
                              getError(`tiers.${tierIndex}.rules.${ruleIndex}`)
                            }
                            productCollectionOptions={productCollectionOptions}
                            productOptions={productOptions}
                            productTagOptions={productTagOptions}
                            productTypeOptions={productTypeOptions}
                            tagOptions={customerTagOptions}
                            variantOptions={variantOptions}
                          />
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
                      {getError(`tiers.${tierIndex}.cashbackValue`) ? (
                        <p className={styles.error}>{getError(`tiers.${tierIndex}.cashbackValue`)}</p>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </section>
            ))}
          </div>
        </Card>

        <div className={styles.actions}>
          <button
            className={styles.secondaryButton}
            onClick={() => {
              clearEditingCampaignId();
              setRoute(ROUTE_CAMPAIGNS);
            }}
            type="button"
          >
            Cancel
          </button>
          <button className={styles.primaryButton} type="submit">
            Save
          </button>
        </div>
      </form>

      <RuleSelectionModal onClose={closeRuleModal} onSelectRule={addRuleToTier} open={Boolean(ruleModalTierId)} />
    </>
  );
};
