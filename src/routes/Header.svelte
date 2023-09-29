<script lang="ts">
	import { page } from '$app/stores';
	import { AppBar, TabAnchor, TabGroup, getDrawerStore } from '@skeletonlabs/skeleton';
	import HeaderCart from './HeaderCart.svelte';
	import HeaderSettingsIcon from './HeaderSettingsIcon.svelte';
	import MediaQuery from './MediaQuery.svelte';
	import { authStore, isAdmin } from './login/authStore';

	const drawerStore = getDrawerStore();

	const openDrawer = () => {
		drawerStore.open({
			id: 'mobile-nav',
			meta: { test: 'args from triggerer' },
			width: 'w-3/4 sm:w-64'
		});
	};

	$: isAdminVisible = isAdmin($authStore);
</script>

<AppBar
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
	regionRowMain="place-self-center max-w-screen-xl"
>
	<svelte:fragment slot="lead">
		<MediaQuery query="(max-width: 699px)">
			<button class="btn-icon variant-ghost-surface" on:click={openDrawer}
				><i class="fa-solid fa-bars" /></button
			>
		</MediaQuery>
		<MediaQuery query="(min-width: 700px)">
			<a class="btn-icon variant-ghost-surface" href="/">
				<i class="fa-solid fa-utensils" />
			</a>
		</MediaQuery>
	</svelte:fragment>
	<svelte:fragment>
		<MediaQuery query="(min-width: 700px)">
			<TabGroup>
				<TabAnchor href="/" selected={$page.url.pathname === '/'}>Home</TabAnchor>
				{#if isAdminVisible}
					<TabAnchor href="/admin" selected={$page.url.pathname.includes('/admin')}>Admin</TabAnchor
					>
				{/if}
				<TabAnchor href="/login" selected={$page.url.pathname.includes('/login')}>Login</TabAnchor>
			</TabGroup>
		</MediaQuery>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<HeaderCart />
		<HeaderSettingsIcon />
	</svelte:fragment>
</AppBar>
