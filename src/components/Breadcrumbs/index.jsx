import { ChevronRight, Home } from "lucide-react";
import {
  ROUTE_HOME,
  ROUTE_LABELS,
  useRouteStore,
} from "../../stores/route.store";

export const Breadcrumbs = () => {
  const route = useRouteStore((state) => state.route);
  const setRoute = useRouteStore((state) => state.setRoute);
  const currentLabel = ROUTE_LABELS[route];

  return (
    <nav>
      <button type="button" onClick={() => setRoute(ROUTE_HOME)}>
        <Home size={18} aria-hidden />
      </button>
      <span>
        <ChevronRight size={16} />
      </span>
      <span>{currentLabel}</span>
    </nav>
  );
}
