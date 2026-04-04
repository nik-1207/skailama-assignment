import { ChevronRight, Home } from "lucide-react";
import { ROUTE_HOME, ROUTE_LABELS, useRouteStore } from "../../stores/route.store";
import styles from "./breadcrumbs.module.scss";

export const Breadcrumbs = () => {
  const route = useRouteStore((state) => state.route);
  const setRoute = useRouteStore((state) => state.setRoute);
  const currentLabel = ROUTE_LABELS[route];

  return (
    <nav className={styles.breadcrumbs}>
      <button className={styles.homeButton} onClick={() => setRoute(ROUTE_HOME)}>
        <Home size={18} />
      </button>
      <span className={styles.chevron}>
        <ChevronRight size={16} />
      </span>
      <span className={styles.current}>{currentLabel}</span>
    </nav>
  );
};
