<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { Food } from '../../types';
	import FoodForm from '../FoodForm.svelte';

	export let form;

	let defaultValues: Food | undefined;

	const autofill = () => {
		defaultValues = { id: undefined as any, img: '', name: 'test', price: 10.43 };
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

<Button on:click={autofill} class="mt-3">Auto fill</Button>
