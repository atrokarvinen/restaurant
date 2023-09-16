<script lang="ts">
	import { page } from '$app/stores';
	import { AppBar, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	let tabSet: number = 0;
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<a class="btn-icon variant-ghost-surface" href="/">
			<i class="fa-solid fa-utensils" />
		</a>
	</svelte:fragment>
	<svelte:fragment>
		<TabGroup>
			<TabAnchor href="/" selected={$page.url.pathname === '/'}>Home</TabAnchor>
			<TabAnchor href="/admin" selected={$page.url.pathname === '/admin'}>Admin</TabAnchor>
			<TabAnchor href="/login" selected={$page.url.pathname === '/login'}>Login</TabAnchor>
		</TabGroup>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<a
			class={`btn variant-ghost-${$page.url.pathname === '/cart' ? 'primary' : 'surface'}`}
			href="/cart"
		>
			<i class="fa-solid fa-cart-shopping" /><span>Cart</span>
		</a>
	</svelte:fragment>
</AppBar>
