<script lang="ts">
	import '@fortawesome/fontawesome-free';
	import '@fortawesome/free-regular-svg-icons';
	import '@fortawesome/free-solid-svg-icons';
	import '../app.postcss';
	// Floating UI for Popups
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import {
		AppShell,
		Drawer,
		Modal,
		Toast,
		getDrawerStore,
		storePopup
	} from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import Button from '$lib/components/Button.svelte';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import Header from './Header.svelte';
	import { cartStore, defaultCart } from './cart/cartStore';
	import { authStore } from './login/authStore';

	export let data;

	initializeStores();

	$: $authStore = data.user;
	$: $cartStore = data.cart ?? defaultCart;

	$: console.log('[UI] loaded cart:', data.cart);

	const drawerStore = getDrawerStore();
</script>

<Modal />
<Toast position="t" />
<Drawer>
	{#if $drawerStore.id === 'mobile-nav'}
		<div>
			<span>Meta:</span>
			<span>{$drawerStore.meta.test}</span>

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
