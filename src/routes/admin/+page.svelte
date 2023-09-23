<script lang="ts">
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import CreatedFoodList from './CreatedFoodList.svelte';

	export let data;
	export let form;

	$: foods = data.foods;

	const toastStore = getToastStore();
	$: {
		if (form?.error) {
			const t: ToastSettings = {
				message: form.error,
				timeout: 5000,
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		}
		if (form?.success) {
			const t: ToastSettings = {
				message: `Successfully deleted food '${form.deletedFood?.name}'.`,
				timeout: 5000,
				background: 'variant-filled-success'
			};
			toastStore.trigger(t);
		}
	}
</script>

<div class="space-y-2 md:w-96 sm:w-64">
	<h1>Admin</h1>
	<p>This is admin page. Here you can add foods to the menu, or edit existing ones.</p>

	<CreatedFoodList {foods} />

	<div class="flex flex-row items-end justify-end">
		<a class="btn variant-filled-primary mt-3" href="/admin/new">
			<i class="fa-solid fa-plus" />
			<span> Add new </span>
		</a>
	</div>
</div>
