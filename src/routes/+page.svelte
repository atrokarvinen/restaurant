<script lang="ts">
	import Menu from './Menu.svelte';
	import type { CartType, Food } from './types';

	export let data;
	// console.log("data:", data);
	const loadedFoods = data.foodDtos;
	const loadedCartItems = data.cartItems;

	let foods: Food[] = loadedFoods ?? [];

	// let cartItems: CartType = { items: {} };
	let asDict = loadedCartItems.reduce((prev, curr) => {
		return { ...prev, [curr.id]: curr };
	}, {});
	console.log('asDict:', asDict);

	let cartItems: CartType = loadedCartItems ?? [];

	console.log('[UI] cartItems:', cartItems);
</script>

<div>
	<h1>Menu:</h1>
	<Menu {foods} {cartItems} />
</div>
