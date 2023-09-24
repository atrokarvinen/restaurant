<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import type { User } from '../types';
	import { authStore } from './authStore';

	export let data;
	export let form;

	let options: User[] = data.users;
	let selectedValue: number | undefined = $authStore?.id;

	$: console.log('selectedValue:', selectedValue);
	$: console.log('username: ', $authStore?.name);
	$: {
		if (form?.user) {
			$authStore = form.user;
			selectedValue = undefined;
		} else if (form?.logoutSuccess) {
			$authStore = undefined;
		}
	}
	$: loginDisabled = $authStore !== undefined;
	$: logoutDisabled = $authStore === undefined;
</script>

<h1>Login</h1>

<div class="space-y-2">
	{#if $authStore}
		<p>{`Logged in as '${$authStore.name}'`}</p>
		<form method="post" action="?/logout" use:enhance>
			<button class="btn variant-filled-secondary" disabled={logoutDisabled}>Logout</button>
		</form>
	{:else}
		<p>Select user:</p>
		<form method="post" action="?/login" use:enhance class="space-y-2">
			<select class="select" bind:value={selectedValue} name="user">
				{#each options as option}
					<option value={option.id}>{option.name}</option>
				{/each}
			</select>
			<Button disabled={loginDisabled}>Login</Button>
		</form>
	{/if}
</div>
