<script lang="ts">
	import { axios } from '$lib/axios';
	import FoodItem from './FoodItem.svelte';
	import type { CartItem, CartType, Food } from './types';

	export let foods: Food[];
	export let cartItems: CartType;

	$: foodInCart = (foodId: number) => {
		const foodIdsInCart = cartItems.map((i) => i.food.id);
		const exists = foodIdsInCart.some((id) => id === foodId);
		console.log('foodIdsInCart:', foodIdsInCart);
		return exists;
	};

	const addToCart = async (food: Food) => {
		console.log('Added to cart:', food);
		try {
			const payload: Omit<CartItem, 'id'> = { food: food, quantity: 1 };
			const response = await axios.post('/cart', payload);
			const newItem = {
				id: response.data.id,
				food,
				quantity: response.data.quantity
			};
			cartItems = [...cartItems, newItem];
		} catch (error) {
			console.log('error adding to cart: ', error);
		}
	};
</script>

<ul>
	{#each foods as food}
		<li>
			<FoodItem {food} {addToCart} disabled={foodInCart(food.id)} />
		</li>
	{/each}
</ul>
