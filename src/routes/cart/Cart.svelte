<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { Cart } from '../types';
	import CartActions from './CartActions.svelte';
	import { calculateCartCost } from './cart-utils';

	export let cart: Cart;
	export let onOrderClicked: () => void;

	const checkCartEmpty = (cart: Cart) => {
		const noItems = cart.items.length === 0;
		const allQuantityZero = cart.items.every((i) => i.quantity === 0);
		return noItems || allQuantityZero;
	};

	$: items = cart.items;
	$: cost = calculateCartCost(cart);
	$: isCartEmpty = checkCartEmpty(cart);
</script>

<div class="text-lg">
	<ul class="list space-y-2">
		{#each items as item}
			<li class="w-full justify-between">
				<span>{item.food?.name}</span>
				<span>{`(${item.quantity})`}</span>
				<div class="flex space-x-1">
					<CartActions cartId={cart.id} cartItem={item} />
				</div>
			</li>
		{/each}
	</ul>
	{#if isCartEmpty}
		<div class="alert variant-filled flex-row items-center justify-center space-x-4">
			<i class="fa-solid fa-info-circle" />
			<div class="alert-message">
				<h3 class="h3">Cart is empty</h3>
				<span> Add items to cart first. </span>
			</div>
		</div>
	{/if}
	<div class="mt-5 space-x-3">
		<span>
			<span>Total cost:</span>
			<span>{`${cost.toFixed(2)} €`}</span>
		</span>
		<Button on:click={onOrderClicked} disabled={isCartEmpty}>Order</Button>
	</div>
</div>

<style>
	.alert > :not([hidden]) {
		margin-top: 0;
	}
</style>
