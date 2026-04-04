import { Card } from "../Card";
import { CalendarField } from "../CalendarField";
import { useShopStore } from "../../stores/shop.store";
import { useCustomerStore } from "../../stores/customer.store";
import styles from "./createOrder.module.scss";

export const CreateOrder = () => {
  const activeShop = useShopStore((state) => state.activeShop);
  const customers = useCustomerStore((state) => state.customers);

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
            <select id="customerId" name="customerId" defaultValue="">
              <option value="" disabled>
                Select customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.id}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="customerEmail">Customer Email</label>
            <input id="customerEmail" name="customerEmail" type="email" value="" readOnly />
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
