const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createStore = async ({ name, timezone }) => {
  const response = await fetch(`${API_BASE_URL}/stores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      timezone,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create store: ${response.status}`);
  }

  return response.json();
};

export const getStores = async () => {
  const response = await fetch(`${API_BASE_URL}/stores`);

  if (!response.ok) {
    throw new Error(`Failed to fetch stores: ${response.status}`);
  }

  return response.json();
};

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

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }

  return response.json();
};

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

export const getCampaigns = () => JSON.parse(localStorage.getItem("campaigns") ?? "[]");

export const createCampaign = (campaign) => {
  const nextCampaign = {
    ...campaign,
    id: crypto.randomUUID(),
  };
  const items = getCampaigns();
  localStorage.setItem("campaigns", JSON.stringify([...items, nextCampaign]));
  return nextCampaign;
};

export const deleteCampaign = (campaignId) => {
  const nextCampaigns = getCampaigns().filter((campaign) => campaign.id !== campaignId);
  localStorage.setItem("campaigns", JSON.stringify(nextCampaigns));
};

export const updateCampaign = (campaignId, nextCampaign) => {
  const nextCampaigns = getCampaigns().map((campaign) =>
    campaign.id === campaignId ? { ...campaign, ...nextCampaign, id: campaignId } : campaign,
  );
  localStorage.setItem("campaigns", JSON.stringify(nextCampaigns));
};

export const seedCampaigns = (campaigns) => {
  localStorage.setItem(
    "campaigns",
    JSON.stringify(
      campaigns.map((campaign) => ({
        ...campaign,
        id: campaign.id ?? crypto.randomUUID(),
      })),
    ),
  );
};
