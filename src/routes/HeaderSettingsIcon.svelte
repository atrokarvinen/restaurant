<script lang="ts">
	import { page } from '$app/stores';
</script>

<a
	class={`btn-icon ${
		$page.url.pathname === '/settings' ? 'variant-ghost-primary' : 'variant-ghost-surface'
	} `}
	href="/settings"><i class="fa-solid fa-cog" /></a
>
