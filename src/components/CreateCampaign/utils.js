import { ShoppingCart, Tag, Users } from "lucide-react";
import { zodResolver } from "../../utils/zodResolver";
import { createCampaignSchema } from "./schema";

export const resolveCreateCampaign = zodResolver(createCampaignSchema);

const getOperatorOptions = (operatorType) => {
  if (operatorType === "comparison") {
    return RULE_OPERATOR_OPTIONS.comparison;
  }

  return RULE_OPERATOR_OPTIONS.equality;
};

export const hydrateCampaignRule = (rule) => {
  const definition = CAMPAIGN_RULE_DEFINITIONS[rule.field];

  if (!definition) {
    return rule;
  }

  return {
    id: rule.id,
    type: rule.type ?? definition.type,
    field: rule.field,
    operator: rule.operator ?? definition.defaultOperator,
    value: rule.value ?? definition.defaultValue,
    label: definition.label,
    placeholder: definition.placeholder,
    inputType: definition.inputType,
    operatorOptions: getOperatorOptions(definition.operatorType),
  };
};

export const getInitialValues = ({ activeShop, editingCampaign, timezone }) => {
  if (editingCampaign) {
    return {
      storeId: editingCampaign.storeId ?? activeShop?._id ?? "",
      isEnabled: editingCampaign.isEnabled ?? true,
      campaignName: editingCampaign.campaignName ?? "",
      campaignType: editingCampaign.campaignType ?? "percentage",
      timezone: editingCampaign.timezone ?? timezone,
      campaignSchedule: editingCampaign.campaignSchedule ?? "scheduled",
      startDateTime: editingCampaign.startDateTime ?? null,
      endDateTime: editingCampaign.endDateTime ?? null,
      deliveryMode: editingCampaign.deliveryMode ?? "immediate",
      deliveryDays: editingCampaign.deliveryDays ?? null,
      expirationMode: editingCampaign.expirationMode ?? "never",
      expirationDays: editingCampaign.expirationDays ?? null,
      expiryTime: editingCampaign.expiryTime ?? null,
      tiers: editingCampaign.tiers?.length
        ? editingCampaign.tiers.map((tier) => ({
            ...tier,
            rules: tier.rules?.map(hydrateCampaignRule) ?? [],
          }))
        : [
            {
              id: crypto.randomUUID(),
              name: "Tier 1",
              cashbackValue: "",
              matchType: "and",
              rules: [],
            },
          ],
    };
  }

  const initialTierId = crypto.randomUUID();

  return {
    storeId: activeShop?._id ?? "",
    isEnabled: true,
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
        matchType: "and",
        rules: [],
      },
    ],
  };
};

export const CAMPAIGN_RULE_GROUPS = [
  {
    key: "customer-rules",
    title: "Customer rules",
    rules: [
      {
        key: "customer-tags",
        label: "Customer Tags",
        description: "Customer must contain these tags",
      },
      {
        key: "customer-spent",
        label: "Customer Lifetime Spent",
        description: "Total amount of orders customers has processed",
      },
    ],
  },
  {
    key: "cart-rules",
    title: "Cart rules",
    rules: [
      {
        key: "cart-quantity",
        label: "Cart Quantity",
        description: "Sum of all products quantity",
      },
      {
        key: "cart-total",
        label: "Cart Total",
        description: "Final price of cart",
      },
      {
        key: "cart-currency",
        label: "Cart Currency",
        description: "Currency in which order is processed",
      },
    ],
  },
  {
    key: "product-rules",
    title: "Product rules",
    rules: [
      {
        key: "specific-products",
        label: "Specific Products",
        description: "Must include these products",
      },
      {
        key: "specific-variants",
        label: "Specific Variants",
        description: "Must include these variants",
      },
      {
        key: "specific-collection",
        label: "Specific Collection",
        description: "Must include Product from these Collection",
      },
      {
        key: "product-tags",
        label: "Product tags",
        description: "Must include products with these tags",
      },
      {
        key: "product-types",
        label: "Product types",
        description: "Must include these product types",
      },
    ],
  },
];

export const CAMPAIGN_RULE_GROUP_ICONS = {
  "customer-rules": Users,
  "cart-rules": ShoppingCart,
  "product-rules": Tag,
};

export const RULE_OPERATOR_OPTIONS = {
  equality: [
    { value: "is", label: "Is" },
    { value: "is-not", label: "Is not" },
  ],
  comparison: [
    { value: ">=", label: "Greater than or equal to" },
    { value: "<=", label: "Less than or equal to" },
    { value: "=", label: "Equal to" },
  ],
};

export const CAMPAIGN_RULE_DEFINITIONS = {
  "customer-tags": {
    type: "customer",
    label: "Customer Tags",
    placeholder: "Select tags",
    inputType: "multiselect",
    operatorType: "equality",
    defaultOperator: "is",
    defaultValue: [],
  },
  "customer-spent": {
    type: "customer",
    label: "Customer Lifetime Spent",
    placeholder: "0",
    inputType: "number",
    operatorType: "comparison",
    defaultOperator: ">=",
    defaultValue: "0",
  },
  "cart-quantity": {
    type: "cart",
    label: "Cart Quantity",
    placeholder: "0",
    inputType: "number",
    operatorType: "comparison",
    defaultOperator: ">=",
    defaultValue: "0",
  },
  "cart-total": {
    type: "cart",
    label: "Cart Total",
    placeholder: "0",
    inputType: "number",
    operatorType: "comparison",
    defaultOperator: ">=",
    defaultValue: "0",
  },
  "cart-currency": {
    type: "cart",
    label: "Cart Currency",
    placeholder: "Select currency",
    inputType: "multiselect",
    operatorType: "equality",
    defaultOperator: "is",
    defaultValue: [],
  },
  "specific-products": {
    type: "product",
    label: "Specific Products",
    placeholder: "Select products",
    inputType: "multiselect",
    operatorType: "equality",
    defaultOperator: "is",
    defaultValue: [],
  },
  "specific-variants": {
    type: "product",
    label: "Specific Variants",
    placeholder: "Select variants",
    inputType: "multiselect",
    operatorType: "equality",
    defaultOperator: "is",
    defaultValue: [],
  },
  "specific-collection": {
    type: "product",
    label: "Specific Collection",
    placeholder: "Select collections",
    inputType: "multiselect",
    operatorType: "equality",
    defaultOperator: "is",
    defaultValue: [],
  },
  "product-tags": {
    type: "product",
    label: "Product Tags",
    placeholder: "Select product tags",
    inputType: "multiselect",
    operatorType: "equality",
    defaultOperator: "is",
    defaultValue: [],
  },
  "product-types": {
    type: "product",
    label: "Product Types",
    placeholder: "Select product types",
    inputType: "multiselect",
    operatorType: "equality",
    defaultOperator: "is",
    defaultValue: [],
  },
};

export const createCampaignRuleDraft = (field) => {
  const definition = CAMPAIGN_RULE_DEFINITIONS[field];

  if (!definition) {
    return null;
  }

  const draft = {
    id: crypto.randomUUID(),
    type: definition.type,
    field,
    label: definition.label,
    placeholder: definition.placeholder,
    inputType: definition.inputType,
    operator: definition.defaultOperator,
    operatorOptions: getOperatorOptions(definition.operatorType),
    value: definition.defaultValue,
  };
  return draft;
};
