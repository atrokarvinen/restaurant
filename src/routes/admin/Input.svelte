<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	interface $$Props extends HTMLInputAttributes {
		label: string;
		error?: string;
		name?: string;
	}

	export let label: string;
	export let error: string | undefined = undefined;
	export let name: string | undefined = undefined;

	name ??= label.toLowerCase();
</script>

<label class="label">
	<span> {label} </span>
	<input class={`input ${error ? 'input-error' : ''}`} {name} {...$$props} />
</label>
{#if error}
	<span class="text-error-300 pl-2">{error}</span>
{/if}
