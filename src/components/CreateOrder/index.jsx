export const CreateOrder = () => {
  return (
    <form>
      <div>
        <label htmlFor="storeName">Store Name</label>
        <br />
        <input id="storeName" name="storeName" type="text" defaultValue="asd" />
      </div>
      <div>
        <label htmlFor="customerId">Customer ID</label>
        <br />
        <input id="customerId" name="customerId" type="text" />
      </div>
      <div>
        <label htmlFor="customerEmail">Customer Email</label>
        <br />
        <input id="customerEmail" name="customerEmail" type="email" />
      </div>
      <div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <br />
          <input id="firstName" name="firstName" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <br />
          <input id="lastName" name="lastName" type="text" />
        </div>
      </div>

      <div>
        <label htmlFor="orderId">Order ID</label>
        <br />
        <input id="orderId" name="orderId" type="text" defaultValue="ORD-1775322968386" />
      </div>
      <div>
        <label htmlFor="orderAmount">Order Amount ($)</label>
        <br />
        <input id="orderAmount" name="orderAmount" type="text" />
      </div>
      <div>
        <label htmlFor="orderCreatedAt">Order Created At</label>
        <input
          id="orderCreatedAt"
          name="orderCreatedAt"
          type="datetime-local"
          defaultValue="2026-04-04T17:16"
        />
      </div>
      <div>
        <button type="submit">crete order</button>
        <button>Cancel</button>
      </div>
    </form>
  );
};
