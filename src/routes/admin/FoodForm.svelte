<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import type { Food } from '../types';
	import Input from './Input.svelte';

	export let errors: any | undefined = undefined;
	export let defaultValues: Food | undefined = undefined;

	$: isEdit = !!defaultValues?.id;
	$: action = isEdit ? '?/update' : '?/create';
</script>

<form class="space-y-2" method="post" {action} use:enhance>
	{#if isEdit}
		<input hidden name="id" value={defaultValues?.id} />
	{/if}

	<Input label="Name" value={defaultValues?.name ?? ''} error={errors?.name} />
	<Input label="Price" value={defaultValues?.price ?? ''} error={errors?.price} />

	<div class="flex flex-col w-48">
		<div>
			<Button>{isEdit ? 'Update' : 'Create'}</Button>
			<a class="btn variant-filled-secondary" href="/admin">Cancel</a>
		</div>
		<SlideToggle name="autofail" class="mt-4">Fail request</SlideToggle>
	</div>
</form>
