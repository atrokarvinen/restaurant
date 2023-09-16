<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { Food } from './types';

	export let food: Food;
	export let addToCart: (food: Food) => void;
	export let disabled: boolean;
</script>

<article>
	<span>{food.name}</span>
	<span>{food.price}</span>
	<Button on:click={() => addToCart(food)} {disabled}>
		<i class="fa-solid fa-plus" />
		<span> Add to cart </span>
	</Button>
</article>
