<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { Food } from '../types';

	export let foods: Food[];
	export let onEditFood: (food: Food) => void;
</script>

<div>
	<h1>Created foods:</h1>
	<ul>
		{#each foods as food}
			<li>
				<span>
					<span>Name:</span>
					<span>{food.name}</span>
				</span>
				<span>
					<span>Price:</span>
					<span>{food.price}</span>
				</span>
				<Button on:click={() => onEditFood(food)}>Edit</Button>
				<form method="post" action="?/delete">
					<input hidden name="id" value={food.id} />
					<Button>Delete</Button>
				</form>
			</li>
		{/each}
	</ul>
</div>
