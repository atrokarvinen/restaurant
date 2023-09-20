<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { Cart } from '../types';
	import CartActions from './CartActions.svelte';
	import { calculateCartCost } from './cart-utils';

	export let cart: Cart;
	export let onOrderClicked: () => void;

	$: items = cart.items;
	$: cost = calculateCartCost(cart);
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
				<CartActions cartId={cart.id} cartItem={item} />
			</li>
		{/each}
	</ul>
	<span>
		<span>Cost:</span>
		<span>{cost.toFixed(2)}</span>
	</span>
	<Button on:click={onOrderClicked}>Order</Button>
</div>
