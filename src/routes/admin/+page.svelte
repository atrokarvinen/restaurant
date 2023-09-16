<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { Food } from '../types';
	import CreatedFoodList from './CreatedFoodList.svelte';
	import EditFoodForm from './EditFoodForm.svelte';

	export let form;
	export let data;

	$: console.log('errors:', form?.errors);
	$: console.log('form submitted successfully:', form?.success);

	let foods: Food[];
	$: foods = data.foods;

	let foodToEdit: Food | undefined;
	const onEditFood = (food: Food) => {
		foodToEdit = food;
	};
	const onAddNew = () => {
		foodToEdit = undefined;
	};
</script>

<h1>Admin</h1>
<p>This is admin page. Here you can add foods to menu</p>

<EditFoodForm errors={form?.errors} defaultValues={foodToEdit} />

<CreatedFoodList {foods} {onEditFood} />

<Button on:click={onAddNew}>+ Add new</Button>
