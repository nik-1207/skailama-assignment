import { useEffect, useState } from "react";
import { Card } from "../Card";
import { CalendarField } from "../CalendarField";
import { MultiSelect } from "../MultiSelect";
import { useShopStore } from "../../stores/shop.store";
import { useCustomerStore } from "../../stores/customer.store";
import { useProductStore } from "../../stores/product.store";
import { zodResolver } from "../../utils/zodResolver";
import { createOrderSchema } from "./schema";
import styles from "./createOrder.module.scss";
import { ROUTE_HOME, useRouteStore } from "../../stores/route.store";
import { CURRENCY_OPTIONS } from "../utils";

const resolveCreateOrder = zodResolver(createOrderSchema);

export const CreateOrder = () => {
  const activeShop = useShopStore((state) => state.activeShop);
  const customers = useCustomerStore((state) => state.customers);
  const loadCustomers = useCustomerStore((state) => state.loadCustomers);
  const products = useProductStore((state) => state.products);
  const loadProducts = useProductStore((state) => state.loadProducts);
  const setRoute = useRouteStore((state) => state.setRoute);

  const [values, setValues] = useState({
    storeId: activeShop?.id ?? "",
    customerId: "",
    orderAmount: "",
    orderCreatedAt: "",
    orderCurrency: "",
    lines: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadCustomers();
    loadProducts();
  }, [loadCustomers, loadProducts]);

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
        return {
          ...current,
          customerId: value,
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
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const result = resolveCreateOrder(values);
    setErrors(result.errors);
  };

  const addLine = () => {
    setValues((current) => ({
      ...current,
      lines: [...current.lines, { id: crypto.randomUUID(), productId: "", variantIds: [], quantity: "" }],
    }));
  };

  const updateLine = ({ lineId, key, value }) => {
    setValues((current) => ({
      ...current,
      lines: current.lines.map((line) => (line.id === lineId ? { ...line, [key]: value } : line)),
    }));
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
                  {customer.firstName} {customer.lastName}
                </option>
              ))}
            </select>
            {errors.customerId ? <p className={styles.error}>{errors.customerId}</p> : null}
          </div>

          <div className={styles.productHeader}>
            <label className={styles.productLabel}>Products</label>
            <button className={styles.addProductButton} onClick={addLine} type="button">
              Add product
            </button>
          </div>

          <div className={styles.lines}>
            {values.lines.map((line, index) => {
              const selectedProduct = products.find((product) => product.id === line.productId);
              const variantOptions = (selectedProduct?.variants ?? []).map((variant) => ({
                value: variant.id,
                label: variant.name,
              }));

              return (
                <div className={styles.lineRow} key={line.id}>
                  <span className={styles.lineIndex}>{index + 1}.</span>
                  <select
                    className={styles.productName}
                    onChange={(event) => updateLine({ lineId: line.id, key: "productId", value: event.target.value })}
                    value={line.productId}
                  >
                    <option value="" disabled>
                      Select product                    </option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                  <MultiSelect
                    data={variantOptions}
                    onChange={(next) => updateLine({ lineId: line.id, key: "variantIds", value: next })}
                    value={line.variantIds}
                  />
                  <input
                    className={styles.quantityInput}
                    onChange={(event) => updateLine({
                      lineId: line.id, key: "quantity", value: event.target.value
                    })}
                    placeholder="Quantity"
                    type="number"
                    value={line.quantity}
                  />
                </div>
              );
            })}
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

          <div className={styles.field}>
            <label htmlFor="orderCurrency">Order Currency</label>
            <select id="orderCurrency" name="orderCurrency" value={values.orderCurrency} onChange={onChange}>
              <option value="" disabled>
                Select currency
              </option>
              {CURRENCY_OPTIONS.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
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
              create order
            </button>
            <button className={styles.secondaryButton} onClick={() => setRoute(ROUTE_HOME)}>
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};
