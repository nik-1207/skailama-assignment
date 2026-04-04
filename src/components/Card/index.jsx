import styles from "./card.module.scss";

export const Card = ({ children, className, disabled }) => {
  return (
    <div
      className={[styles.card, className, disabled ? styles.disabled : undefined]
        .filter((ele) => typeof ele === "string")
        .join(" ")}
    >
      {children}
    </div>
  );
};
