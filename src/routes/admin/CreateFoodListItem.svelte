<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Food } from '@prisma/client';

	export let food: Food;
</script>

<li class="flex flex-row justify-between">
	<span class="flex-1">{food.name}</span>
	<span class="text-left">{`${food.price.toFixed(2)} €`}</span>
	<div class="flex flex-row space-x-1">
		<a class="btn-icon variant-filled-primary" href={`/admin/${food.id}/edit`}>
			<i class="fa-solid fa-edit" />
		</a>
		<form method="post" action="?/delete" use:enhance>
			<input hidden name="id" value={food.id} />
			<button class="btn-icon variant-filled-error">
				<i class="fa-solid fa-trash" />
			</button>
		</form>
	</div>
</li>
