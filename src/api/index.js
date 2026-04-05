export const createStore = ({ name, timezone }) => {
  const store = {
    name,
    id: crypto.randomUUID(),
    timezone: timezone,
  };
  const items = localStorage.getItem("stores");
  localStorage.setItem("stores", JSON.stringify([...JSON.parse(items ?? "[]"), store]));
  return store;
};

export const getStores = () => JSON.parse(localStorage.getItem("stores") ?? "[]");

export const createUser = ({ email, firstName, lastName }) => {
  const user = {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    email,
  };
  const items = localStorage.getItem("users");
  localStorage.setItem("users", JSON.stringify([...JSON.parse(items ?? "[]"), user]));
  return user;
};

export const getUsers = () => JSON.parse(localStorage.getItem("users") ?? "[]");

export const seedUsers = (users) => {
  localStorage.setItem(
    "users",
    JSON.stringify(
      users.map((user) => ({
        id: crypto.randomUUID(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      })),
    ),
  );
};

export const getProducts = () => JSON.parse(localStorage.getItem("products") ?? "[]");

export const seedProducts = (products) => {
  localStorage.setItem(
    "products",
    JSON.stringify(
      products.map((product) => ({
        id: product.id,
        name: product.name,
        collectionId: product.collectionId ?? null,
        productType: {
          id: product.productType.id,
          name: product.productType.name,
        },
        tags: product.tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
        })),
        variants: product.variants.map((variant) => ({
          id: variant.id,
          name: variant.name,
        })),
      })),
    ),
  );
};

export const getCollections = () => JSON.parse(localStorage.getItem("collections") ?? "[]");

export const seedCollections = (collections) => {
  localStorage.setItem(
    "collections",
    JSON.stringify(
      collections.map((collection) => ({
        id: collection.id,
        name: collection.name,
      })),
    ),
  );
};

export const getCustomerTags = () => JSON.parse(localStorage.getItem("customerTags") ?? "[]");

export const seedCustomerTags = (tags) => {
  localStorage.setItem(
    "customerTags",
    JSON.stringify(
      tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      })),
    ),
  );
};
