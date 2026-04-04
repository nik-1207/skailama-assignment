import { useEffect, useState } from "react";
import { Card } from "../Card";
import { CalendarField } from "../CalendarField";
import { useShopStore } from "../../stores/shop.store";
import { useCustomerStore } from "../../stores/customer.store";
import { createOrderSchema } from "./schema";
import { zodResolver } from "./zodResolver";
import styles from "./createOrder.module.scss";

const resolveCreateOrder = zodResolver(createOrderSchema);

export const CreateOrder = () => {
  const activeShop = useShopStore((state) => state.activeShop);
  const customers = useCustomerStore((state) => state.customers);
  const loadCustomers = useCustomerStore((state) => state.loadCustomers);
  const [values, setValues] = useState({
    storeId: activeShop?.id ?? "",
    customerId: "",
    firstName: "",
    lastName: "",
    customerEmail: "",
    orderId: "",
    orderAmount: "",
    orderCreatedAt: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  useEffect(() => {
    setValues((current) => ({
      ...current,
      storeId: activeShop?.id ?? "",
    }));
  }, [activeShop]);

  const onChange = (event) => {
    const { name, value } = event.target;

    setValues((current) => {
      if (name === "customerId") {
        const selectedCustomer = customers.find((customer) => customer.id === value);

        return {
          ...current,
          customerId: value,
          firstName: selectedCustomer?.firstName ?? "",
          lastName: selectedCustomer?.lastName ?? "",
          customerEmail: selectedCustomer?.email ?? "",
        };
      }

      return {
        ...current,
        [name]: value,
      };
    });

    setErrors((current) => ({
      ...current,
      [name]: undefined,
      ...(name === "customerId"
        ? {
            firstName: undefined,
            lastName: undefined,
            customerEmail: undefined,
          }
        : {}),
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const result = resolveCreateOrder(values);
    setErrors(result.errors);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1 className={styles.title}>Create order</h1>

        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.field}>
            <label htmlFor="storeName">Store Name</label>
            <input
              id="storeName"
              name="storeName"
              type="text"
              value={activeShop?.name ?? ""}
              readOnly
            />
            {errors.storeId ? <p className={styles.error}>{errors.storeId}</p> : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="customerId">Customer ID</label>
            <select id="customerId" name="customerId" value={values.customerId} onChange={onChange}>
              <option value="" disabled>
                Select customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.id}
                </option>
              ))}
            </select>
            {errors.customerId ? <p className={styles.error}>{errors.customerId}</p> : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="customerEmail">Customer Email</label>
            <input
              id="customerEmail"
              name="customerEmail"
              type="email"
              value={values.customerEmail}
              readOnly
            />
            {errors.customerEmail ? <p className={styles.error}>{errors.customerEmail}</p> : null}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" type="text" value={values.firstName} readOnly />
              {errors.firstName ? <p className={styles.error}>{errors.firstName}</p> : null}
            </div>

            <div className={styles.field}>
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" type="text" value={values.lastName} readOnly />
              {errors.lastName ? <p className={styles.error}>{errors.lastName}</p> : null}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="orderId">Order ID</label>
            <input id="orderId" name="orderId" type="text" value={values.orderId} onChange={onChange} />
            {errors.orderId ? <p className={styles.error}>{errors.orderId}</p> : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="orderAmount">Order Amount ($)</label>
            <input
              id="orderAmount"
              name="orderAmount"
              type="text"
              value={values.orderAmount}
              onChange={onChange}
            />
            {errors.orderAmount ? <p className={styles.error}>{errors.orderAmount}</p> : null}
          </div>

          <CalendarField
            id="orderCreatedAt"
            name="orderCreatedAt"
            label="Order Created At"
            value={values.orderCreatedAt}
            onChange={onChange}
            error={errors.orderCreatedAt}
          />

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
