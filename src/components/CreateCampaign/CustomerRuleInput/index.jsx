import { Trash2 } from "lucide-react";
import styles from "./customerRuleInput.module.scss";

export const CustomerRuleInput = ({
  inputType = "text",
  label,
  onDelete,
  onOperatorChange,
  onValueChange,
  operatorOptions,
  operatorValue,
  placeholder,
  prefix,
  error,
  value,
}) => {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{label}</h3>
        <button className={styles.deleteButton} onClick={onDelete} type="button">
          <Trash2 size={18} />
        </button>
      </div>

      <div className={styles.controls}>
        <select className={styles.control} onChange={onOperatorChange} value={operatorValue}>
          {operatorOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className={styles.valueControl}>
          {prefix ? <span className={styles.prefix}>{prefix}</span> : null}
          <input
            className={styles.valueInput}
            onChange={onValueChange}
            placeholder={placeholder}
            type={inputType}
            value={value}
          />
        </div>
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}
    </section>
  );
};
