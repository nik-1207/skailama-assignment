import { ShoppingCart, Tag, Users } from "lucide-react";

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

const getOperatorOptions = (operatorType) => {
  if (operatorType === "comparison") {
    return RULE_OPERATOR_OPTIONS.comparison;
  }

  return RULE_OPERATOR_OPTIONS.equality;
};

export const CAMPAIGN_RULE_DEFINITIONS = {
  "customer-tags": {
    type: "customer-rule",
    label: "Customer Tags",
    placeholder: "Select tags",
    inputType: "multiselect",
    operatorType: "equality",
    defaultOperator: "is",
    defaultValue: [],
  },
  "customer-spent": {
    type: "customer-rule",
    label: "Customer Lifetime Spent",
    placeholder: "0",
    inputType: "number",
    operatorType: "comparison",
    defaultOperator: ">=",
    defaultValue: "0",
  },
  "cart-quantity": {
    type: "cart-rule",
    label: "Cart Quantity",
    placeholder: "0",
    inputType: "number",
    operatorType: "comparison",
    defaultOperator: ">=",
    defaultValue: "0",
  },
  "cart-total": {
    type: "cart-rule",
    label: "Cart Total",
    placeholder: "0",
    inputType: "number",
    operatorType: "comparison",
    defaultOperator: ">=",
    defaultValue: "0",
  },
  "cart-currency": {
    type: "cart-rule",
    label: "Cart Currency",
    placeholder: "Select currency",
    inputType: "multiselect",
    operatorType: "equality",
    defaultOperator: "is",
    defaultValue: [],
  },
  "specific-products": {
    type: "product-rule",
    label: "Specific Products",
    placeholder: "Select products",
    inputType: "multiselect",
    operatorType: "equality",
    defaultOperator: "is",
    defaultValue: [],
  },
  "specific-variants": {
    type: "product-rule",
    label: "Specific Variants",
    placeholder: "Select variants",
    inputType: "multiselect",
    operatorType: "equality",
    defaultOperator: "is",
    defaultValue: [],
  },
  "specific-collection": {
    type: "product-rule",
    label: "Specific Collection",
    placeholder: "Select collections",
    inputType: "multiselect",
    operatorType: "equality",
    defaultOperator: "is",
    defaultValue: [],
  },
  "product-tags": {
    type: "product-rule",
    label: "Product Tags",
    placeholder: "Select product tags",
    inputType: "multiselect",
    operatorType: "equality",
    defaultOperator: "is",
    defaultValue: [],
  },
  "product-types": {
    type: "product-rule",
    label: "Product Types",
    placeholder: "Select product types",
    inputType: "multiselect",
    operatorType: "equality",
    defaultOperator: "is",
    defaultValue: [],
  },
};

const getVarPathByField = (field) => {
  switch (field) {
    case "customer-tags":
      return "customer.tags";
    case "customer-spent":
      return "customer.totalSpent";
    case "cart-quantity":
      return "cart.quantity";
    case "cart-total":
      return "cart.total";
    case "cart-currency":
      return "cart.currency";
    case "specific-products":
      return "cart.productIds";
    case "specific-variants":
      return "cart.variantIds";
    case "specific-collection":
      return "cart.collectionIds";
    case "product-tags":
      return "cart.productTags";
    case "product-types":
      return "cart.productTypes";
    default:
      return field;
  }
};

export const buildCampaignRuleLogic = ({ field, operator, value }) => {
  const variable = { var: getVarPathByField(field) };

  switch (operator) {
    case "is":
      if (Array.isArray(value)) {
        return { in: [variable, value] };
      }
      return { "==": [variable, value] };
    case "is-not":
      if (Array.isArray(value)) {
        return { "!": [{ in: [variable, value] }] };
      }
      return { "!=": [variable, value] };
    case ">=":
      return { ">=": [variable, Number(value || 0)] };
    case "<=":
      return { "<=": [variable, Number(value || 0)] };
    case "=":
      return { "==": [variable, Number(value || 0)] };
    default:
      return { "==": [variable, value] };
  }
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

  return {
    ...draft,
    logic: buildCampaignRuleLogic(draft),
  };
};
