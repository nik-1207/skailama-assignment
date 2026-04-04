import { z } from "zod/v4";

export const createOrderSchema = z.object({
  storeId: z.uuid("Store ID must be a valid UUID"),
  customerId: z.uuid("Customer ID must be a valid UUID"),
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  customerEmail: z.email("Customer email must be valid"),
  orderId: z.string().trim().min(1, "Order ID is required"),
  orderAmount: z
    .string()
    .trim()
    .min(1, "Order amount is required")
    .refine((value) => !Number.isNaN(Number(value)) && Number(value) >= 0, {
      message: "Order amount must be a valid non-negative number",
    }),
  orderCreatedAt: z.string().trim().min(1, "Order created at is required"),
});
