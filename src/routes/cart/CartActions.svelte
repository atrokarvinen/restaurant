<script lang="ts">
	import { axios } from '$lib/axios';
	import type { CartItem } from '../types';
	import { cartStore } from './cartStore';

	export let cartItem: CartItem;
	export let cartId: number;

	const removeFromCart = async () => {
		try {
			// const response = await axios.delete(`/cart/${cartId}/food/${food.id}`);
			const response = await axios.delete(`/cart/${cartId}/item/${cartItem.id}`);
			cartStore.update((prev) => {
				const newCart = { ...prev, items: prev.items.filter((i) => i.id !== cartItem.id) };
				return newCart;
			});
		} catch (error) {
			console.log('error removing from cart: ', error);
		}
	};

	const changeCartItemQuantity = async (cartItemId: number, change: number) => {
		try {
			const response = await axios.put('/cart', {
				id: cartItemId,
				change
			});
			const updatedItem = response.data;
			cartStore.update((prev) => {
				const newCart = {
					...prev,
					items: prev.items.map((i) => {
						if (i.id !== cartItem.id) return i;
						return updatedItem;
					})
				};
				return newCart;
			});
		} catch (error) {
			console.log('failed to change cart item quantity', error);
		}
	};
</script>

<button
	class="btn-icon variant-filled-primary"
	on:click={() => changeCartItemQuantity(cartItem.id, 1)}
>
	<i class="fa-solid fa-plus" />
</button>
<button
	class="btn-icon variant-filled-error"
	on:click={() => changeCartItemQuantity(cartItem.id, -1)}
	disabled={cartItem.quantity <= 0}
>
	<i class="fa-solid fa-minus" />
</button>
<button class="btn-icon variant-filled-error" on:click={removeFromCart}>
	<i class="fa-solid fa-trash" />
</button>
