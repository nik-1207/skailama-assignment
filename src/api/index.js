export const createStore = (name) => {
  const store = {
    name,
    id: crypto.randomUUID(),
  };
  const items = localStorage.getItem("stores")
  localStorage.setItem("stores", JSON.stringify([...JSON.parse(items ?? '[]'), store]));
};
