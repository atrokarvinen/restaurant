<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { Food } from '../../types';
	import FoodForm from '../FoodForm.svelte';
	import { foodNames } from './foodNames';

	export let form;

	let defaultValues: Food | undefined;

	const autofill = () => {
		const foodNameIndex = Math.round(Math.random() * (foodNames.length - 1));
		const name = foodNames[foodNameIndex];
		const price = Math.round((5 + Math.random() * 20) * 100) / 100;
		defaultValues = { id: undefined as any, img: '', name, price };
	};

	const toastStore = getToastStore();
	$: {
		if (form?.apiError) {
			const t: ToastSettings = {
				message: `Failed to create food: ${form.apiError}`,
				timeout: 5000,
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		}
	}
</script>

<div>New</div>

<FoodForm errors={form?.errors} {defaultValues} />

<Button on:click={autofill} class="mt-3">Generate for me</Button>
