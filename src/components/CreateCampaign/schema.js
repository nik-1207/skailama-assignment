import { z } from "zod/v4";

const ruleTypeSchema = z.enum(["product-rule", "cart-rule", "customer-rule"]);
const tierMatchTypeSchema = z.enum(["and", "or"]);
const ruleOperatorSchema = z.enum(["is", "is-not", ">=", "<=", "="]);
const multiValueRuleFields = [
  "customer-tags",
  "cart-currency",
  "specific-products",
  "specific-variants",
  "specific-collection",
  "product-tags",
  "product-types",
];
const numericRuleFields = ["customer-spent", "cart-quantity", "cart-total"];

const jsonLogicPrimitiveSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

const jsonLogicSchema = z.lazy(() =>
  z.union([
    jsonLogicPrimitiveSchema,
    z.array(jsonLogicSchema),
    z.record(z.string(), jsonLogicSchema),
  ]),
);

const campaignRuleSchema = z.object({
  id: z.uuid("Rule ID is required"),
  type: ruleTypeSchema,
  field: z.string().trim().min(1, "Rule field is required"),
  operator: ruleOperatorSchema,
  value: z.union([z.string(), z.array(z.string())]),
  logic: z
    .record(z.string(), jsonLogicSchema)
    .refine((value) => Object.keys(value).length > 0, "Rule logic is required"),
}).superRefine((rule, context) => {
  if (multiValueRuleFields.includes(rule.field)) {
    if (!Array.isArray(rule.value) || rule.value.length === 0) {
      context.addIssue({
        code: "custom",
        path: ["value"],
        message: "Select at least one value",
      });
    }
  }

  if (numericRuleFields.includes(rule.field)) {
    if (typeof rule.value !== "string" || !rule.value.trim()) {
      context.addIssue({
        code: "custom",
        path: ["value"],
        message: "Value is required",
      });
      return;
    }

    if (Number.isNaN(Number(rule.value))) {
      context.addIssue({
        code: "custom",
        path: ["value"],
        message: "Value must be a number",
      });
    }
  }
});

const campaignTierSchema = z.object({
  id: z.uuid("Tier ID is required"),
  name: z.string().trim().min(1, "Tier name is required"),
  cashbackValue: z.string().trim().min(1, "Cashback value is required"),
  matchType: tierMatchTypeSchema,
  rules: z.array(campaignRuleSchema).min(1, "At least one rule is required"),
});

export const createCampaignSchema = z
  .object({
    storeId: z.uuid("Store ID is required"),
    isEnabled: z.boolean(),
    campaignName: z.string().trim().min(1, "Campaign name is required"),
    campaignType: z.enum(["percentage", "number"]),
    timezone: z.string().trim().min(1, "Campaign timezone is required"),
    campaignSchedule: z.enum(["continuous", "scheduled"]),
    startDateTime: z.string().nullable(),
    endDateTime: z.string().nullable(),
    deliveryMode: z.enum(["immediate", "after-specified-days"]),
    deliveryDays: z.string().nullable(),
    expirationMode: z.enum(["never", "after-specified-days"]),
    expirationDays: z.string().nullable(),
    expiryTime: z.string().nullable(),
    tiers: z.array(campaignTierSchema).min(1, "At least one tier is required").max(5, "Maximum 5 tiers are allowed"),
  })
  .superRefine((values, context) => {
    if (values.campaignSchedule === "scheduled") {
      if (!values.startDateTime?.trim()) {
        context.addIssue({
          code: "custom",
          path: ["startDateTime"],
          message: "Start date and time is required",
        });
      }

      if (!values.endDateTime?.trim()) {
        context.addIssue({
          code: "custom",
          path: ["endDateTime"],
          message: "End date and time is required",
        });
      }
    } else {
      if (values.startDateTime !== null) {
        context.addIssue({
          code: "custom",
          path: ["startDateTime"],
          message: "Start date and time must be null for continuous campaigns",
        });
      }

      if (values.endDateTime !== null) {
        context.addIssue({
          code: "custom",
          path: ["endDateTime"],
          message: "End date and time must be null for continuous campaigns",
        });
      }
    }

    if (values.deliveryMode === "after-specified-days") {
      if (!values.deliveryDays?.trim()) {
        context.addIssue({
          code: "custom",
          path: ["deliveryDays"],
          message: "Delivery days is required",
        });
      }
    } else if (values.deliveryDays !== null) {
      context.addIssue({
        code: "custom",
        path: ["deliveryDays"],
        message: "Delivery days must be null for immediate delivery",
      });
    }

    if (values.expirationMode === "after-specified-days") {
      if (!values.expirationDays?.trim()) {
        context.addIssue({
          code: "custom",
          path: ["expirationDays"],
          message: "Expiration days is required",
        });
      }

      if (!values.expiryTime?.trim()) {
        context.addIssue({
          code: "custom",
          path: ["expiryTime"],
          message: "Expiry time is required",
        });
      }
    } else {
      if (values.expirationDays !== null) {
        context.addIssue({
          code: "custom",
          path: ["expirationDays"],
          message: "Expiration days must be null when expiration mode is never",
        });
      }

      if (values.expiryTime !== null) {
        context.addIssue({
          code: "custom",
          path: ["expiryTime"],
          message: "Expiry time must be null when expiration mode is never",
        });
      }
    }
  });

export { campaignRuleSchema, campaignTierSchema, jsonLogicSchema, tierMatchTypeSchema };
