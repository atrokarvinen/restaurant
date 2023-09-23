<script lang="ts">
	import { page } from '$app/stores';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import FoodForm from '../../FoodForm.svelte';

	export let data;
	export let form;

	const params = $page.params;
	const foodId = params.foodId;

	const defaultValues = data.food;

	const toastStore = getToastStore();
	$: {
		if (form?.apiError) {
			const t: ToastSettings = {
				message: `Failed to update food: ${form.apiError}`,
				timeout: 5000,
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		}
	}
</script>

<div>Edit</div>

{#if !defaultValues}
	<div class="alert variant-filled-error">
		<i class="fa-solid fa-alert" />
		<div class="alert-message">{`Food with id (${foodId}) was not found`}</div>
	</div>
{:else}
	<FoodForm {defaultValues} errors={form?.errors} />
{/if}
