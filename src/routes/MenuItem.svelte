<script lang="ts">
	import { axios } from '$lib/axios';
	import { getErrorMessage } from '$lib/errorHandling';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import CartActions from './cart/CartActions.svelte';
	import { cartStore } from './cart/cartStore';
	import type { Cart, Food } from './types';

	export let food: Food;
	export let cart: Cart;

	const toast = getToastStore();

	const addToCart = async (food: Food) => {
		console.log('Added to cart:', food);
		try {
			const payload = { food: food, quantity: 1, cartId: cart.id };
			const response = await axios.post('/cart', payload);
			const newItem = {
				id: response.data.id,
				food,
				quantity: response.data.quantity
			};
			cartStore.update((prev) => {
				const newCart = { ...prev, items: [...prev.items, newItem] };
				return newCart;
			});
		} catch (error) {
			toast.trigger({
				message: getErrorMessage(error),
				background: 'variant-filled-error',
				timeout: 2000
			});
		}
	};

	$: cartItem = cart.items.find((i) => i.food.id === food.id);
</script>

<article class="card p-4 space-y-2 text-lg max-w-xs">
	<img class="object-cover h-48 w-full" src={food.img} alt={food.name} />
	<div class="flex flex-wrap align-middle gap-2 place-content-between">
		<div class="flex flex-col">
			<span>{food.name}</span>
			<span>{`${food.price.toFixed(2)} €`}</span>
		</div>
		<div class="flex items-center gap-2">
			{#if cartItem}
				<span>{`(${cartItem?.quantity})`}</span>
				<CartActions cartId={cart.id} {cartItem} />
			{:else}
				<button class="btn-icon variant-filled-primary" on:click={() => addToCart(food)}>
					<i class="fa-solid fa-plus" />
				</button>
			{/if}
		</div>
	</div>
</article>
