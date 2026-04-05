import { ChevronRight, Home } from "lucide-react";
import { getRouteBreadcrumbs, ROUTE_HOME, useRouteStore } from "../../stores/route.store";
import styles from "./breadcrumbs.module.scss";

export const Breadcrumbs = () => {
  const route = useRouteStore((state) => state.route);
  const setRoute = useRouteStore((state) => state.setRoute);
  const breadcrumbs = getRouteBreadcrumbs(route);

  return (
    <nav className={styles.breadcrumbs}>
      <button className={styles.homeButton} onClick={() => setRoute(ROUTE_HOME)}>
        <Home size={18} />
      </button>
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div className={styles.crumb} key={breadcrumb.path}>
            <span className={styles.chevron}>
              <ChevronRight size={16} />
            </span>
            {isLast ? (
              <span className={styles.current}>{breadcrumb.label}</span>
            ) : (
              <button className={styles.crumbButton} onClick={() => setRoute(breadcrumb.path)}>
                {breadcrumb.label}
              </button>
            )}
          </div>
        );
      })}
    </nav>
  );
};
