<script lang="ts">
	import MenuItem from './MenuItem.svelte';
	import type { Cart, Food } from './types';

	export let foods: Food[];
	export let cart: Cart;
</script>

<div class="grid gap-4 grid-cols-3">
	{#each foods as food}
		<MenuItem {food} {cart} />
	{/each}
</div>
