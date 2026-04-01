import { Modal } from "../../Modal";
import { useModalStore } from "./modal.store";
import { useState } from "react";
import { useShopStore } from "../../../stores/shop.store";
import styles from "./createStoreModal.module.scss";

export const CreateStoreModal = () => {
  const close = useModalStore((state) => state.closeModal);
  const isOpen = useModalStore((state) => state.isOpen);
  const addShop = useShopStore((state) => state.addShop)

  const [store, setStore] = useState("");

  const onChange = (event) => {
    setStore(event.target.value);
  };

  const onCancel = () => {
    setStore("");
    close();
  };

  const onSave = () => {
    const name = store.trim();
    if (!name) return;
    addShop(name);
    onCancel();
  };

  return (
    <Modal title="Create Store" onClose={onCancel} open={isOpen}>
      <input className={styles.input} type="text" value={store} onChange={onChange} />
      <div className={styles.actions}>
        <button className={styles.save} onClick={onSave}>
          Save
        </button>
        <button className={styles.cancel} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};
