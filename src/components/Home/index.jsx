import { useShopStore } from "../../stores/shop.store";
import { Card } from "../Card";
import { Cards } from "./utils";
import styles from "./home.module.scss";
import { useRouteStore } from "../../stores/route.store";

export const Home = () => {
  const activeStore = useShopStore((state) => state.activeShop);
  const setRoute = useRouteStore((state) => state.setRoute);

  return (
    <div className={styles.home}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.heading}>Cashback System Dashboard</h1>
        <p className={styles.subtitle}>
          {!activeStore ? "Please select a store to begin." : `Managing store: ${activeStore}`}
        </p>
      </div>
      <div className={styles.container}>
        {Cards.map((ele) => {
          const Icon = ele.icon;
          return (
            <Card key={ele.title} className={styles.card} disabled={!activeStore}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrap} aria-hidden>
                  <Icon size={30} />
                </div>
                <span className={styles.cardTitle}>{ele.title}</span>
              </div>
              <p className={styles.cardDescription}>{ele.description}</p>
              <button
                className={styles.cardButton}
                disabled={!activeStore}
                onClick={() => setRoute(ele.action.path)}
              >
                {ele.action.title}
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
