<script lang="ts">
	import { onDestroy } from 'svelte';
	import Menu from './Menu.svelte';
	import { cartStore } from './cart/cartStore';
	import type { Cart, Food } from './types';

	export let data;
	// console.log("data:", data);
	const loadedFoods = data.foodDtos;
	const loadedCart = data.cart;
	let foods: Food[] = loadedFoods ?? [];
	let cart: Cart = { id: -1, items: [] };

	const unsubscribe = cartStore.subscribe((reduxCart) => {
		console.log('cart updated:', reduxCart);
		cart = { id: reduxCart.id, items: reduxCart.items };
	});

	onDestroy(() => {
		console.log('on destroy');
		unsubscribe();
	});

	// let cart = loadedCart ?? { id: 1, items: [] };
	console.log('loadedCart:', loadedCart);

	if (!!loadedCart) {
		cartStore.set({
			id: loadedCart.id,
			items: loadedCart.items.map((i) => ({
				id: i.id,
				food: i.food,
				quantity: i.quantity
			}))
		});
	}

	console.log('[UI] cart:', cart);
</script>

<div>
	<Menu {foods} {cart} />
</div>
