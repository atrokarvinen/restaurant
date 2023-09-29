<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';

	$: changeTheme(selectedValue);

	const changeTheme = (selectedTheme: string | undefined) => {
		if (!selectedTheme) return;
		let elements = document.getElementsByTagName('body');
		let body = elements[0];
		const dataThemeAttribute = body.attributes.getNamedItem('data-theme');
		if (dataThemeAttribute && selectedValue) {
			dataThemeAttribute.value = selectedValue.toLowerCase();
		}
	};

	let selectedValue: string | undefined = undefined;
	let themes = [
		'Skeleton',
		'Crimson',
		'Wintry',
		'Modern',
		'Rocket',
		'Seafoam',
		'Vintage',
		'Sahara',
		'Hamlindigo'
	];
</script>

<div class="space-y-4">
	<div class="flex space-x-2">
		<p>Dark mode:</p>
		<LightSwitch />
	</div>

	<div>
		<label for="theme-select">Theme:</label>
		<select id="theme-select" class="select" bind:value={selectedValue}>
			{#each themes as theme}
				<option value={theme}>{theme}</option>
			{/each}
		</select>
	</div>
</div>
