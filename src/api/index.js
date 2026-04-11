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

export const getProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  return response.json();
};

export const createOrder = async (order) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error(`Failed to create order: ${response.status}`);
  }

  return response.json();
};

export const getCollections = async () => {
  const response = await fetch(`${API_BASE_URL}/collections`);

  if (!response.ok) {
    throw new Error(`Failed to fetch collections: ${response.status}`);
  }

  return response.json();;
};

export const getCustomerTags = async () => {
  const response = await fetch(`${API_BASE_URL}/customer-tags`);

  if (!response.ok) {
    throw new Error(`Failed to fetch customer tags: ${response.status}`);
  }

  return response.json();
};

// TODO: migrate from db
export const getCampaigns = () => JSON.parse(localStorage.getItem("campaigns") ?? "[]");

// TODO: migrate from db
export const createCampaign = (campaign) => {
  const nextCampaign = {
    ...campaign,
    id: crypto.randomUUID(),
  };
  const items = getCampaigns();
  localStorage.setItem("campaigns", JSON.stringify([...items, nextCampaign]));
  return nextCampaign;
};

// TODO: migrate from db
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
