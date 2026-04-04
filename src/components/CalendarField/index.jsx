import styles from "./calendarField.module.scss";

export const CalendarField = ({ id, label, name, value, readOnly = false, onChange, error }) => {
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
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
};
