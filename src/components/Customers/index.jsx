import { useEffect, useMemo } from "react";
import { useCustomerStore } from "../../stores/customer.store";
import styles from "./customers.module.scss";

const CUSTOMER_SUMMARY_PRESETS = [
  { cashbackBalance: 15.5, lastUpdated: "2025-10-15T15:30:00" },
  { cashbackBalance: 0, lastUpdated: "2025-10-12T20:00:00" },
  { cashbackBalance: 125, lastUpdated: "2025-10-16T14:45:00" },
  { cashbackBalance: 42.75, lastUpdated: "2025-10-14T11:15:00" },
];

const formatCurrency = (value) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

const formatDateTime = (value) =>
  new Date(value).toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

export const Customers = () => {
  const customers = useCustomerStore((state) => state.customers);
  const loadCustomers = useCustomerStore((state) => state.loadCustomers);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const customerRows = useMemo(
    () =>
      customers.map((customer, index) => {
        const summary = CUSTOMER_SUMMARY_PRESETS[index % CUSTOMER_SUMMARY_PRESETS.length];

        return {
          id: customer.id,
          firstName: customer.firstName,
          email: customer.email,
          cashbackBalance: formatCurrency(summary.cashbackBalance),
          lastUpdated: formatDateTime(summary.lastUpdated),
        };
      }),
    [customers],
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Customers</h1>

      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Email</th>
              <th>Cashback Balance</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {customerRows.map((customer) => (
              <tr key={customer.id}>
                <td className={styles.nameCell}>{customer.firstName}</td>
                <td className={styles.emailCell}>{customer.email}</td>
                <td className={styles.balanceCell}>{customer.cashbackBalance}</td>
                <td className={styles.updatedCell}>{customer.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
