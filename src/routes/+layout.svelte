<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { AppShell, Modal, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { initializeStores } from '@skeletonlabs/skeleton';
	import Header from './Header.svelte';

	initializeStores();
</script>

<Modal />

<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>

	<slot />
</AppShell>
