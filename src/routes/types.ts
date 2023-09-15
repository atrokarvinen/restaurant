export type Food = {
  id: number;
  name: string;
  price: number;
};

// export type CartType = {
//   items: Record<number, CartItem>;
// };
export type CartType = CartItem[];

export type CartItem = {
  id: number;
  food: Food;
  quantity: number;
};
