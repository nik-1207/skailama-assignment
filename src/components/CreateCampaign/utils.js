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
        key: "customer-lifetime-spent",
        label: "Customer Spent",
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
