import { MegaphoneIcon, ShoppingCartIcon, Users } from "lucide-react";
import { ROUTE_CAMPAIGNS, ROUTE_CUSTOMERS, ROUTE_ORDERS } from "../../stores/route.store";

export const Cards = [
  {
    title: "Create an Order",
    icon: ShoppingCartIcon,
    description: "Simulate a new order to test cashback processing.",
    action: {
      title: "Create order",
      path: ROUTE_ORDERS,
    },
  },
  {
    title: "Campaigns",
    icon: MegaphoneIcon,
    description: "Create, view, and manage all your cashback campaigns.",
    action: {
      title: "Configure campaigns",
      path: ROUTE_CAMPAIGNS,
    },
  },
  {
    title: "Customers",
    icon: Users,
    description: "View customer data, cashback balances, and transaction history.",
    action: {
      title: "View customers",
      path: ROUTE_CUSTOMERS,
    },
  },
];
