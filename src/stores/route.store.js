import { create } from "zustand";

export const ROUTE_HOME = "home";
export const ROUTE_ORDERS = "create-order";
export const ROUTE_CAMPAIGNS = "configure-campaigns";
export const ROUTE_CUSTOMERS = "view-customers";

export const ROUTES = [ROUTE_HOME, ROUTE_ORDERS, ROUTE_CAMPAIGNS, ROUTE_CUSTOMERS];

export const ROUTE_LABELS = {
  [ROUTE_HOME]: "Home",
  [ROUTE_ORDERS]: "Create Order",
  [ROUTE_CAMPAIGNS]: "Campaigns",
  [ROUTE_CUSTOMERS]: "Customers",
};

function isValidRoute(route) {
  return ROUTES.includes(route);
}

export const useRouteStore = create((set) => ({
  route: ROUTE_HOME,
  setRoute: (next) => {
    if (isValidRoute(next)) {
      set({ route: next });
    } else {
      console.error(`Invalid route: ${next}`);
    }

  },
}));
