<script lang="ts">
  import type { Food } from "./types";

  export let food: Food = {name: "n", price: 1};
  export let addToCart = (food: Food) => {}
</script>

<article>
  <span>{food.name}</span>
  <span>{food.price}</span>
  <button on:click={() => addToCart(food)}>+ Add to cart</button>
</article>
