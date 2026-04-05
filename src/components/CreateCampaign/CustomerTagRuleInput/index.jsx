import { Trash2 } from "lucide-react";
import { MultiSelect } from "../../MultiSelect";
import styles from "./customerTagRuleInput.module.scss";

export const CustomerTagRuleInput = ({
  label,
  onDelete,
  onOperatorChange,
  onValueChange,
  operatorOptions,
  operatorValue,
  placeholder,
  tagOptions,
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

        <MultiSelect data={tagOptions} onChange={onValueChange} placeholder={placeholder} value={value} />
      </div>
    </section>
  );
};
