import { CirclePlus } from "lucide-react";
import { useShopStore } from "../../stores/shop.store";
import { useModalStore } from "./CreateStoreModal/modal.store";
import styles from "./header.module.scss";
import { CreateStoreModal } from "./CreateStoreModal";

export const Header = () => {
  const activeShop = useShopStore((state) => state.activeShop);
  const open = useModalStore((state) => state.openModal);

  return (
    <header>
      <div>
        <h3 className={activeShop ? styles.active : styles.inactive}>
          {activeShop ?? "No Active Shop"}
        </h3>
        <button onClick={open}>
          <CirclePlus size={20} />
          Create Shop
        </button>
      </div>
      <CreateStoreModal />
    </header>
  );
};
