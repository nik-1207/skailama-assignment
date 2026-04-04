import { CalendarDays } from "lucide-react";
import { Card } from "../Card";
import styles from "./createOrder.module.scss";

export const CreateOrder = () => {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1 className={styles.title}>Create order</h1>

        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="storeName">Store Name</label>
            <input id="storeName" name="storeName" type="text" defaultValue="asd" />
          </div>

          <div className={styles.field}>
            <label htmlFor="customerId">Customer ID</label>
            <input id="customerId" name="customerId" type="text" />
          </div>

          <div className={styles.field}>
            <label htmlFor="customerEmail">Customer Email</label>
            <input id="customerEmail" name="customerEmail" type="email" />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" type="text" />
            </div>
            <div className={styles.field}>
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" type="text" />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="orderId">Order ID</label>
            <input id="orderId" name="orderId" type="text" defaultValue="ORD-1775322968386" />
          </div>

          <div className={styles.field}>
            <label htmlFor="orderAmount">Order Amount ($)</label>
            <input id="orderAmount" name="orderAmount" type="text" />
          </div>

          <div className={`${styles.field} ${styles.dateField}`}>
            <label htmlFor="orderCreatedAt">Order Created At</label>
            <input
              id="orderCreatedAt"
              name="orderCreatedAt"
              type="datetime-local"
              defaultValue="2026-04-04T17:16"
            />
            <CalendarDays className={styles.icon} size={18} />
          </div>

          <div className={styles.actions}>
            <button className={styles.primaryButton} type="submit">
              crete order
            </button>
            <button className={styles.secondaryButton} type="button">
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};
