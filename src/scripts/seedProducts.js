import { getProducts, seedProducts } from "../api";

const products = [
  {
    id: "prod-classic-tee",
    name: "Classic Tee",
    productType: { id: "ptype-apparel", name: "Apparel" },
    tags: [
      { id: "ptag-bestseller", name: "Bestseller" },
      { id: "ptag-summer", name: "Summer" },
    ],
    variants: [
      { id: "var-classic-tee-s-blue", name: "Small / Blue" },
      { id: "var-classic-tee-m-black", name: "Medium / Black" },
      { id: "var-classic-tee-l-white", name: "Large / White" },
    ],
  },
  {
    id: "prod-canvas-tote",
    name: "Canvas Tote",
    productType: { id: "ptype-accessories", name: "Accessories" },
    tags: [
      { id: "ptag-eco", name: "Eco" },
      { id: "ptag-gifting", name: "Gifting" },
    ],
    variants: [
      { id: "var-canvas-tote-natural-standard", name: "Natural / Standard" },
      { id: "var-canvas-tote-black-standard", name: "Black / Standard" },
      { id: "var-canvas-tote-olive-large", name: "Olive / Large" },
    ],
  },
  {
    id: "prod-everyday-bottle",
    name: "Everyday Bottle",
    productType: { id: "ptype-drinkware", name: "Drinkware" },
    tags: [
      { id: "ptag-gym", name: "Gym" },
      { id: "ptag-bestseller", name: "Bestseller" },
    ],
    variants: [
      { id: "var-everyday-bottle-500-silver", name: "500ml / Silver" },
      { id: "var-everyday-bottle-750-black", name: "750ml / Black" },
      { id: "var-everyday-bottle-1l-blue", name: "1L / Blue" },
    ],
  },
  {
    id: "prod-signature-cap",
    name: "Signature Cap",
    productType: { id: "ptype-headwear", name: "Headwear" },
    tags: [
      { id: "ptag-streetwear", name: "Streetwear" },
      { id: "ptag-summer", name: "Summer" },
    ],
    variants: [
      { id: "var-signature-cap-black-adjustable", name: "Black / Adjustable" },
      { id: "var-signature-cap-white-adjustable", name: "White / Adjustable" },
      { id: "var-signature-cap-green-snapback", name: "Green / Snapback" },
    ],
  },
];

if (getProducts().length === 0) {
  seedProducts(products);
}
