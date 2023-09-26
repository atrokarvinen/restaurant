<script lang="ts">
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import {
		AppShell,
		Drawer,
		Modal,
		Toast,
		getDrawerStore,
		storePopup
	} from '@skeletonlabs/skeleton';
	import '../app.postcss';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import Header from './Header.svelte';
	import { cartStore, defaultCart } from './cart/cartStore';
	import { authStore, isAdmin } from './login/authStore';

	export let data;

	initializeStores();

	$: $authStore = data.user;
	$: $cartStore = data.cart ?? defaultCart;

	$: console.log('[UI] loaded cart:', data.cart);

	const drawerStore = getDrawerStore();

	$: isAdminVisible = isAdmin($authStore);
	$: {
		console.log('path:', $page.url.pathname);
		drawerStore.close();
	}
	$: path = $page.url.pathname;
</script>

<Modal />
<Toast position="t" />
<Drawer>
	{#if $drawerStore.id === 'mobile-nav'}
		<div class="p-4">
			<nav class="list-nav pb-5">
				<ul>
					<li>
						<a href="/" class={path === '/' ? 'bg-primary-active-token' : ''}>Home</a>
					</li>
					<li>
						{#if isAdminVisible}
							<a href="/admin" class={path.includes('/admin') ? 'bg-primary-active-token' : ''}
								>Admin</a
							>
						{/if}
					</li>
					<li>
						<a href="/login" class={path.includes('/login') ? 'bg-primary-active-token' : ''}
							>Login</a
						>
					</li>
				</ul>
			</nav>
			<Button on:click={() => drawerStore.close()}>Close</Button>
		</div>
	{:else}
		<div>{`Unknown drawer store id '${$drawerStore.id}'`}</div>
	{/if}
</Drawer>

<AppShell regionPage="justify-center flex" slotPageContent="max-w-screen-xl place-self-center p-5">
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>

	<slot />
</AppShell>
