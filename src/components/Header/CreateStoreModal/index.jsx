import { Modal } from "../../Modal";
import { useModalStore } from "./modal.store";
import { useState } from "react";
import { useShopStore } from "../../../stores/shop.store";
import styles from "./createStoreModal.module.scss";
import { TIMEZONE_OPTIONS } from "../../utils";

export const CreateStoreModal = () => {
  const close = useModalStore((state) => state.closeModal);
  const isOpen = useModalStore((state) => state.isOpen);
  const addShop = useShopStore((state) => state.addShop);

  const [store, setStore] = useState("");
  const [timezone, setTimezone] = useState();

  const onChange = (event) => {
    setStore(event.target.value);
  };

  const onTimezoneChange = (event) => {
    setTimezone(event.target.value);
  };

  const onCancel = () => {
    setStore("");
    setTimezone();
    close();
  };

  const onSave = () => {
    const name = store.trim();
    if (!name) return;
    addShop({ name, timezone });
    onCancel();
  };

  return (
    <Modal title="Create Store" onClose={onCancel} open={isOpen}>
      <div className={styles.container}>
        <input className={styles.input} type="text" value={store} onChange={onChange} />
        <select className={styles.input} value={timezone} onChange={onTimezoneChange}>
          {Array.from(new Set(TIMEZONE_OPTIONS)).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
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
