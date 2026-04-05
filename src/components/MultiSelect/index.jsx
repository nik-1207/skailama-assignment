import { useEffect, useRef, useState } from "react";
import styles from "./multiSelect.module.scss";
import { ChevronDown } from "lucide-react";


export const MultiSelect = ({ value, onChange, data, placeholder = "Pick values" }) => {
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");
  const [opened, setOpened] = useState(false);

  const selectedValues = Array.isArray(value) ? value : [];
  const selectedOptions = data.filter((option) => selectedValues.includes(option.value));
  const filteredOptions = data.filter((option) => {
    const matchesSearch = option.label.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && !selectedValues.includes(option.value);
  });

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpened(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const handleSelect = (optionValue) => {
    onChange([...selectedValues, optionValue]);
    setSearch("");
    setOpened(true);
    inputRef.current?.focus();
  };

  const handleRemove = (optionValue) => {
    onChange(selectedValues.filter((item) => item !== optionValue));
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <div
        className={styles.control}
        onClick={() => {
          setOpened(true);
          inputRef.current?.focus();
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpened(true);
            inputRef.current?.focus();
          }
        }}
      >
        <div className={styles.values}>
          {selectedOptions.map((option) => (
            <span className={styles.pill} key={option.value}>
              <span>{option.label}</span>
              <button
                className={styles.pillRemove}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleRemove(option.value);
                }}
              >
                x
              </button>
            </span>
          ))}
          <input
            className={styles.input}
            onChange={(event) => setSearch(event.target.value)}
            onFocus={() => setOpened(true)}
            placeholder={selectedOptions.length === 0 ? placeholder : ""}
            ref={inputRef}
            type="text"
            value={search}
          />
        </div>
        <span className={styles.chevron}><ChevronDown/></span>
      </div>

      {opened ? (
        <div className={styles.dropdown}>
          {filteredOptions.length === 0 ? (
            <div className={styles.empty}>No option</div>
          ) : (
            filteredOptions.map((option) => (
              <button
                className={styles.option}
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
};
