import { getCollections, seedCollections } from "../api";

const collections = [
  { id: "pcol-summer-essentials", name: "Summer Essentials" },
  { id: "pcol-everyday-carry", name: "Everyday Carry" },
  { id: "pcol-fitness-favorites", name: "Fitness Favorites" },
  { id: "pcol-street-style", name: "Street Style" },
];

if (getCollections().length === 0) {
  seedCollections(collections);
}
