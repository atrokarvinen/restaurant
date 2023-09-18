<script lang="ts">
	import { axios } from '$lib/axios';
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

<!-- <ul>
	{#each foods as food}
		<li>
			<FoodItem {food} {addToCart} disabled={foodInCart(food.id)} />
		</li>
	{/each}
</ul> -->

<div class="grid gap-4 grid-cols-3">
	{#each foods as food}
		<article class="card p-4 space-y-2">
			<img class="object-cover h-48 w-64" src={food.img} alt={food.name} />
			<div class="flex align-middle gap-2 place-content-between">
				<div class="flex flex-col text-lg">
					<span>{food.name}</span>
					<span>{`${food.price.toFixed(2)} €`}</span>
				</div>
				<div class="flex items-center gap-2">
					<button class="btn-icon variant-filled-primary">
						<i class="fa-solid fa-plus" />
					</button>
					<button class="btn-icon variant-filled-error">
						<i class="fa-solid fa-minus" />
					</button>
				</div>
			</div>
		</article>
	{/each}
</div>
