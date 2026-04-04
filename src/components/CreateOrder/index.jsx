import { Card } from "../Card";
import { CalendarField } from "../CalendarField";
import { useShopStore } from "../../stores/shop.store";
import styles from "./createOrder.module.scss";

export const CreateOrder = () => {
  const activeShop = useShopStore((state) => state.activeShop);

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1 className={styles.title}>Create order</h1>

        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="storeName">Store Name</label>
            <input id="storeName" name="storeName" type="text" value={activeShop} readOnly />
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
            <input id="orderId" name="orderId" type="text" />
          </div>

          <div className={styles.field}>
            <label htmlFor="orderAmount">Order Amount ($)</label>
            <input id="orderAmount" name="orderAmount" type="text" />
          </div>

          <CalendarField id="orderCreatedAt" name="orderCreatedAt" label="Order Created At" />

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
