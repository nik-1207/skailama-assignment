import { CirclePlus } from "lucide-react";
import { useShopStore } from "../../stores/shop.store";
import styles from "./header.module.scss";
import { useModalStore } from "../CreateStoreModal/modal.store";
import { Modal } from "../CreateStoreModal";

export const Header = () => {
  const activeShop = useShopStore((state) => state.activeShop);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <header>
      <div>
        <h3 className={activeShop ? styles.active : styles.inactive}>
          {activeShop ?? "No Active Shop"}
        </h3>
        <button onClick={openModal}>
          <CirclePlus size={20} />
          Select Shop
        </button>
        <Modal>
          <h2>Create Store</h2>
          <p>Modal content goes here</p>
        </Modal>
      </div>
    </header>
  );
};
