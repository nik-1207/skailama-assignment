import { getUsers, seedUsers } from "../api";

const users = [
  {
    firstName: "Aarav",
    lastName: "Sharma",
    email: "aarav.sharma@example.com",
  },
  {
    firstName: "Diya",
    lastName: "Patel",
    email: "diya.patel@example.com",
  },
  {
    firstName: "Kabir",
    lastName: "Mehta",
    email: "kabir.mehta@example.com",
  },
  {
    firstName: "Isha",
    lastName: "Reddy",
    email: "isha.reddy@example.com",
  },
];

if (getUsers().length === 0) {
  seedUsers(users);
}
