export type Food = {
	id: number;
	name: string;
	price: number;
	img: string;
};

export type CartItem = {
	id: number;
	food: Food;
	quantity: number;
};

export type Cart = {
	id: number;
	items: CartItem[];
};
