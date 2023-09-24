<script lang="ts">
	import '@fortawesome/fontawesome-free';
	import '@fortawesome/free-regular-svg-icons';
	import '@fortawesome/free-solid-svg-icons';
	import '../app.postcss';
	// Floating UI for Popups
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { AppShell, Modal, Toast, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { initializeStores } from '@skeletonlabs/skeleton';
	import Header from './Header.svelte';
	import { authStore } from './login/authStore';

	export let data;

	initializeStores();

	console.log('[layout] mounts');

	$: $authStore = data.user;
</script>

<Modal />
<Toast position="t" />

<AppShell regionPage="justify-center flex" slotPageContent="max-w-screen-xl place-self-center p-5">
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>

	<slot />
</AppShell>
