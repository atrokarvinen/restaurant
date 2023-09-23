<script lang="ts">
	import type { Food } from '../types';
	import CreateFoodListItem from './CreateFoodListItem.svelte';

	export let foods: Food[];

	const unknownFood: Food = { id: -1, img: '', name: 'Unknown food', price: 0 };
</script>

<h1>Existing foods:</h1>
<ul class="list space-y-2">
	{#each foods as food}
		<CreateFoodListItem {food} />
	{/each}
	<CreateFoodListItem food={unknownFood} />
</ul>
