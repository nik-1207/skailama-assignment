import { CirclePlus } from "lucide-react";
import { useShopStore } from "../../stores/shop.store";
import styles from "./header.module.scss";

export const Header = () => {
  const activeShop = useShopStore((state) => state.activeShop);

  return (
    <header>
      <div>
        <h3 className={activeShop ? styles.active : styles.inactive}>{activeShop ?? "No Active Shop"}</h3>
        <button>
          <CirclePlus size={20} />
          Select Shop
        </button>
      </div>
    </header>
  );
};
