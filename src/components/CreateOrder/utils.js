import { zodResolver } from "../../utils/zodResolver";
import { createOrderSchema } from "./schema";

export const resolveCreateOrder = zodResolver(createOrderSchema);
