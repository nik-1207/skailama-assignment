import { z } from "zod/v4";

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
  lines: z.array(z.object({})).min(1, "Order should have at least 1 product"),
});
