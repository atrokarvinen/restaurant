<script lang="ts">
  import type { Food } from "./types";

  export let food: Food;
  export let addToCart: (food: Food) => void;
  export let disabled: boolean;
</script>

<article>
  <span>{food.name}</span>
  <span>{food.price}</span>
  <button on:click={() => addToCart(food)} {disabled}>+ Add to cart</button>
</article>
