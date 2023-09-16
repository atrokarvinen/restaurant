<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { CartItem, CartType } from './types';

	export let items: CartType;
	export let incrementCartItem: (item: CartItem) => void;
	export let decrementCartItem: (item: CartItem) => void;
	export let removeCartItem: (item: CartItem) => void;
	export let onOrderClicked: () => void;

	let cost: number = 0;
	$: cost = items.reduce((prev, curr) => {
		return prev + curr.food?.price * curr.quantity;
	}, 0);
</script>

<div>
	<h1>Cart:</h1>
	<ul>
		{#each items as item}
			<li>
				<span>
					<span>Name:</span>
					<span>{item.food?.name}</span>
				</span>
				<span>
					<span>Quantity:</span>
					<span>{item.quantity}</span>
				</span>
				<button class="btn-icon variant-filled-primary" on:click={() => incrementCartItem(item)}
					><i class="fa-solid fa-plus" /></button
				>
				<button
					class="btn-icon variant-filled-primary"
					on:click={() => decrementCartItem(item)}
					disabled={item.quantity <= 0}><i class="fa-solid fa-minus" /></button
				>
				<Button on:click={() => removeCartItem(item)}>Remove</Button>
			</li>
		{/each}
	</ul>
	<span>
		<span>Cost:</span>
		<span>{cost.toFixed(2)}</span>
	</span>
	<Button on:click={onOrderClicked}>Order</Button>
</div>
