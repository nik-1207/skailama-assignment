import { Modal } from "../../Modal";
import { useModalStore } from "./modal.store";
import { useState } from "react";
import { useShopStore } from "../../../stores/shop.store";
import styles from "./createStoreModal.module.scss";
import { CURRENCY_OPTIONS, TIMEZONE_OPTIONS } from "../../utils";

const DEFAULT_TIMEZONE = "UTC";
const DEFAULT_CURRENCY = "USD";

export const CreateStoreModal = () => {
  const close = useModalStore((state) => state.closeModal);
  const isOpen = useModalStore((state) => state.isOpen);
  const addShop = useShopStore((state) => state.addShop);

  const [store, setStore] = useState("");
  const [timezone, setTimezone] = useState(DEFAULT_TIMEZONE);
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [error, setError] = useState("");

  const onChange = (event) => {
    setStore(event.target.value);
    setError("");
  };

  const onTimezoneChange = (event) => {
    setTimezone(event.target.value);
    setError("");
  };

  const onCurrencyChange = (event) => {
    setCurrency(event.target.value);
    setError("");
  };

  const onCancel = () => {
    setStore("");
    setTimezone(DEFAULT_TIMEZONE);
    setCurrency(DEFAULT_CURRENCY);
    setError("");
    close();
  };

  const onSave = async () => {
    const name = store.trim();
    if (!name) return;
    setError("");

    try {
      await addShop({ name, timezone, currency });
      onCancel();
    } catch (nextError) {
      setError(nextError?.message ?? "Unable to create store");
    }
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
        <select className={styles.input} value={currency} onChange={onCurrencyChange}>
          {CURRENCY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error ? <p className={styles.error}>{error}</p> : null}
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
