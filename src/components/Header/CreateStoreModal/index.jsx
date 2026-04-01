import { Modal } from "../../Modal";
import { useModalStore } from "./modal.store";
import { useState } from "react";
import styles from "./createStoreModal.module.scss";
import { createStore } from "../../../api";

export const CreateStoreModal = () => {
  const close = useModalStore((state) => state.closeModal);
  const isOpen = useModalStore((state) => state.isOpen);

  const [store, setStore] = useState("");

  const onChange = (event) => {
    setStore(event.target.value);
  };

  const onSave = () => {
    createStore(store)
    onCancel()
  };

  const onCancel = () => {
    setStore("");
    close();
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
