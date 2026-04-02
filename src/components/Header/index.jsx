import { CirclePlus } from "lucide-react";
import { useShopStore } from "../../stores/shop.store";
import { useModalStore } from "./CreateStoreModal/modal.store";
import styles from "./header.module.scss";
import { CreateStoreModal } from "./CreateStoreModal";
import { useEffect } from "react";

export const Header = () => {
  const activeShop = useShopStore((state) => state.activeShop);
  const shops = useShopStore((state) => state.shops);
  const setActiveShop = useShopStore((state) => state.setActiveShop);
  const loadShops = useShopStore((state) => state.loadShops);
  const open = useModalStore((state) => state.openModal);

  useEffect(() => {
    loadShops();
  }, [loadShops]);

  const onChangeShop = (event) => {
    setActiveShop(event.target.value);
  };

  return (
    <header>
      <div className={styles.container}>
        <h3 className={activeShop ? styles.active : styles.inactive}>
          {!activeShop.trim() ? (
            "No Active Shop"
          ) : (
            <>
              <span className={styles.activeShopTitle}>Active Shop: </span>
              <span className={styles.activeShopName}>{activeShop}</span>
            </>
          )}
        </h3>
        <div className={styles.controls}>
          <select className={styles.select} value={activeShop} onChange={onChangeShop}>
            <option value="" disabled>
              Select shop
            </option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.name}>
                {shop.name}
              </option>
            ))}
          </select>
          <button onClick={open}>
            <CirclePlus size={20} />
            Create Shop
          </button>
        </div>
      </div>
      <CreateStoreModal />
    </header>
  );
};
