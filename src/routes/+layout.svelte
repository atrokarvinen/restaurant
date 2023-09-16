<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<div>
	<nav>
		<a href="/">Home</a>
		<a href="admin">Admin</a>
		<a href="login">Login</a>
	</nav>
	<main>
		<slot />
	</main>
</div>
