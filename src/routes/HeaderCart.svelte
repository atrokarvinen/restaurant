<script lang="ts">
	import { page } from '$app/stores';
	import { calculateCartCost } from './cart/cart-utils';
	import { cartStore } from './cart/cartStore';

	let prevCost: number | undefined = undefined;
	let popCart = false;
	let cost = 0;

	$: cart = $cartStore;
	$: count = cart.items.length;
	$: {
		cost = calculateCartCost(cart);
		popCart = prevCost !== undefined && prevCost !== cost;
		prevCost = cost;
	}
</script>

<a
	class={`btn variant-ghost-${$page.url.pathname === '/cart' ? 'primary' : 'surface'} ${
		popCart ? 'pop' : ''
	}`}
	href="/cart"
	on:animationend={() => (popCart = false)}
>
	<i class="fa-solid fa-cart-shopping" /><span>{`${cost.toFixed(2)} €`}</span>
</a>

<style>
	.pop {
		animation: pop 0.3s linear;
	}

	@keyframes pop {
		50% {
			transform: scale(1.2);
		}
	}
</style>
