<script lang="ts">
  import type { Food } from "../types";

  export let foods: Food[];
  export let onEditFood: (food: Food) => void;
</script>

<div>
  <h1>Created foods:</h1>
  <ul>
    {#each foods as food}
      <li>
        <span>
          <span>Name:</span>
          <span>{food.name}</span>
        </span>
        <span>
          <span>Price:</span>
          <span>{food.price}</span>
        </span>
        <button on:click={() => onEditFood(food)}>Edit</button>
        <form method="post" action="?/delete">
          <input hidden name="id" value={food.id} />
          <button>Delete</button>
        </form>
      </li>
    {/each}
  </ul>
</div>
