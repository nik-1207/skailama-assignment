import { MegaphoneIcon, ShoppingCartIcon, Users } from "lucide-react";

export const Cards = [
  {
    title: "Create an Order",
    icon: ShoppingCartIcon,
    description: "Simulate a new order to test cashback processing.",
    action: {
      title: "Create order",
      path: "create-order",
    },
  },
  {
    title: "Campaigns",
    icon: MegaphoneIcon,
    description: "Create, view, and manage all your cashback campaigns.",
    action: {
      title: "Configure campaigns",
      path: "configure-campaigns",
    },
  },
  {
    title: "Customers",
    icon: Users,
    description: "View customer data, cashback balances, and transaction history.",
    action: {
      title: "View customers",
      path: "view-customers",
    },
  },
];
