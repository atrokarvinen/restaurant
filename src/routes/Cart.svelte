<script lang="ts">
  import type { CartItem, CartType } from "./types";

  export let items: CartType;
  export let incrementCartItem: (item: CartItem) => void;
  export let decrementCartItem: (item: CartItem) => void;
  export let removeCartItem: (item: CartItem) => void;
  export let onOrderClicked: () => void;

  let cost: number = 0;
  $: cost = items.reduce((prev, curr) => {
    return prev + curr.food?.price * curr.quantity;
  }, 0);
</script>

<div>
  <h1>Cart:</h1>
  <ul>
    {#each items as item}
      <li>
        <span>
          <span>Name:</span>
          <span>{item.food?.name}</span>
        </span>
        <span>
          <span>Quantity:</span>
          <span>{item.quantity}</span>
        </span>
        <button on:click={() => incrementCartItem(item)}>+</button>
        <button
          on:click={() => decrementCartItem(item)}
          disabled={item.quantity <= 0}>-</button
        >
        <button on:click={() => removeCartItem(item)}>Remove</button>
        <input name="id" value={item.food?.id} hidden />
        <input name="quantity" value={item.quantity} hidden />
      </li>
    {/each}
  </ul>
  <span>
    <span>Cost:</span>
    <span>{cost.toFixed(2)}</span>
  </span>
  <button on:click={onOrderClicked}>Order</button>
</div>
