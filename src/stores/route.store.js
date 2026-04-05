import { create } from "zustand";

export const ROUTE_HOME = "home";
export const ROUTE_ORDERS = "create-order";
export const ROUTE_CAMPAIGNS = "campaigns";
export const ROUTE_CREATE_CAMPAIGN = "campaigns/create-campaign";
export const ROUTE_CUSTOMERS = "customers";

export const ROUTES = [ROUTE_HOME, ROUTE_ORDERS, ROUTE_CAMPAIGNS, ROUTE_CREATE_CAMPAIGN, ROUTE_CUSTOMERS];

export const ROUTE_LABELS = {
  [ROUTE_HOME]: "Home",
  [ROUTE_ORDERS]: "Create Order",
  [ROUTE_CAMPAIGNS]: "Campaigns",
  [ROUTE_CREATE_CAMPAIGN]: "Create Campaign",
  [ROUTE_CUSTOMERS]: "Customers",
};

export const getRouteBreadcrumbs = (route) => {
  if (route === ROUTE_HOME) {
    return [];
  }

  const segments = route.split("/");

  return segments.map((_, index) => {
    const path = segments.slice(0, index + 1);

    return {
      path,
      label: ROUTE_LABELS[path] ?? path,
    };
  });
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
