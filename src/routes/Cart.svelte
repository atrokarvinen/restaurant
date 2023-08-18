<script lang="ts">
  import type { Food } from "./types";

  export let items: Food[];
  export let removeCartItem: (item: Food) => void;

  let cost: number = 0;
  $: cost = items.reduce((prev, curr, index, arr) => {
    return prev + curr.price;
  }, 0);
</script>

<div>
  <h1>Cart:</h1>
  <ul>
    {#each items as item}
      <li>
        <span>{item.name}</span>
        <button on:click={() => removeCartItem(item)}>Remove</button>
      </li>
    {/each}
  </ul>
  <span>
    <span>Cost:</span>
    <span>{cost.toFixed(2)}</span>
  </span>
</div>
