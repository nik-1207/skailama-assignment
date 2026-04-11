import { useEffect, useMemo } from "react";
import { useCustomerStore } from "../../stores/customer.store";
import styles from "./customers.module.scss";

const EMPTY_VALUE = "-";

export const Customers = () => {
  const customers = useCustomerStore((state) => state.customers);
  const loadCustomers = useCustomerStore((state) => state.loadCustomers);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const customerRows = useMemo(
    () =>
      customers.map((customer) => ({
        id: customer._id,
        firstName: customer.firstName,
        email: customer.email,
        cashbackBalance: customer.cashbackBalance ?? EMPTY_VALUE,
        lastUpdated: customer.lastUpdated ?? EMPTY_VALUE,
      })),
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
