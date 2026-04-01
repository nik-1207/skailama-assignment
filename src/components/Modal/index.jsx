import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useModalStore } from "../Header/CreateStoreModal/modal.store";
import styles from "./modal.module.scss";

export const Modal = ({ children, title, onClose, open }) => {
  if (!open) return null;

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.modalOverlay} onClick={onClose} />

      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={onClose}>
          <X size={18} />
        </button>
        <div className={styles.modalHeader}>{title}</div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};
