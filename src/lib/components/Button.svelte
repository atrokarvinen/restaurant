<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	interface $$Props extends HTMLButtonAttributes {}
</script>

<button class="btn variant-filled-primary" {...$$props} on:click>
	<slot />
</button>
