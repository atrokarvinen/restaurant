<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	interface $$Props extends HTMLButtonAttributes {}
</script>

<button {...$$props} class={`btn variant-filled-primary ${$$props.class}`} on:click>
	<slot />
</button>
