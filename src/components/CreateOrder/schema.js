import { z } from "zod/v4";

const orderLineSchema = z.object({
  productId: z.string().trim().min(1, "Product is required"),
  variantIds: z.array(z.string().trim().min(1)).min(1, "Variant is required").max(1, "Only one variant is supported right now"),
  quantity: z
    .string()
    .trim()
    .min(1, "Quantity is required")
    .refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, {
      message: "Quantity must be a valid number greater than 0",
    }),
});

export const createOrderSchema = z.object({
  storeId: z.string().trim().min(1, "Store ID is required"),
  customerId: z.string().trim().min(1, "Customer ID is required"),
  orderAmount: z
    .string()
    .trim()
    .min(1, "Order amount is required")
    .refine((value) => !Number.isNaN(Number(value)) && Number(value) >= 0, {
      message: "Order amount must be a valid non-negative number",
    }),
  orderCreatedAt: z.string().trim().min(1, "Order created at is required"),
  lines: z.array(orderLineSchema).min(1, "Order should have at least 1 product"),
});
