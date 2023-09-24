<script lang="ts">
	import { page } from '$app/stores';
	import { AppBar, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import HeaderCart from './HeaderCart.svelte';
	import { authStore, isAdmin } from './login/authStore';

	$: isAdminVisible = isAdmin($authStore);
	$: username = $authStore?.name;
</script>

<AppBar
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
	regionRowMain="place-self-center max-w-screen-xl"
>
	<svelte:fragment slot="lead">
		<a class="btn-icon variant-ghost-surface" href="/">
			<i class="fa-solid fa-utensils" />
		</a>
		<div>
			<span>User:</span>
			<span>{username}</span>
		</div>
	</svelte:fragment>
	<svelte:fragment>
		<TabGroup>
			<TabAnchor href="/" selected={$page.url.pathname === '/'}>Home</TabAnchor>
			{#if isAdminVisible}
				<TabAnchor href="/admin" selected={$page.url.pathname.includes('/admin')}>Admin</TabAnchor>
			{/if}
			<TabAnchor href="/login" selected={$page.url.pathname.includes('/login')}>Login</TabAnchor>
		</TabGroup>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<HeaderCart />
	</svelte:fragment>
</AppBar>
