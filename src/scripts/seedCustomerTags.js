import { getCustomerTags, seedCustomerTags } from "../api";

const customerTags = [
  { id: "cust-tag-vip", name: "VIP" },
  { id: "cust-tag-repeat-buyer", name: "Repeat Buyer" },
  { id: "cust-tag-wholesale", name: "Wholesale" },
  { id: "cust-tag-newsletter", name: "Newsletter" },
  { id: "cust-tag-high-value", name: "High Value" },
];

if (getCustomerTags().length === 0) {
  seedCustomerTags(customerTags);
}
