<script lang="ts">
	import Menu from './Menu.svelte';
	import type { Food } from './types';

	export let data;

	const loadedFoods = data.foodDtos;
	let foods: Food[] = loadedFoods ?? [];
</script>

<div>
	<Menu {foods} />
</div>
