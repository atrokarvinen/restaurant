<script lang="ts">
	import MenuItem from './MenuItem.svelte';
	import type { Food } from './types';

	export let foods: Food[];
</script>

<div class="grid gap-4 md:grid-cols-3">
	{#each foods as food}
		<MenuItem {food} />
	{/each}
</div>
