import { CalendarDays } from "lucide-react";
import styles from "./calendarField.module.scss";

export const CalendarField = ({ id, label, name, value, readOnly = false, onChange }) => {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type="datetime-local"
        value={value}
        readOnly={readOnly}
        onChange={onChange}
      />
      <CalendarDays className={styles.icon} size={18} />
    </div>
  );
};
