import type { Food } from "@prisma/client";

export const initialFoods: Omit<Food, "id">[] = [
  { name: "Burger", price: 18.55 },
  { name: "Sallad", price: 8.1 },
  { name: "Salmon", price: 27.95 },
];
