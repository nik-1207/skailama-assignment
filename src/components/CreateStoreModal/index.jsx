import { createPortal } from "react-dom";
import { useModalStore } from "./modal.store";

export const Modal = ({ children }) => {
  const { isOpen, closeModal } = useModalStore();

  if (!isOpen) return null;

  return createPortal(
    <div className="modal">
      <div className="modal-overlay" onClick={closeModal} />

      <div className="modal-content">
        <button onClick={closeModal}>✕</button>
        <h2>Create Store</h2>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};
