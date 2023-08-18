<script lang="ts">
  import Cart from "./Cart.svelte";
  import FoodItem from "./FoodItem.svelte";
  import type { Food } from "./types";

  let foods: Food[] = [
    { name: "Burger", price: 10.45 },
    { name: "Salad", price: 8.1 },
    { name: "Salmon", price: 23.99 },
  ];

  let cartItems: Food[] = [];

  let name = "test";
  let price = "10";
  const handleSubmit = async (e: SubmitEvent) => {
    const data = new FormData(e.target as HTMLFormElement);
    const values = { name, price: +price };
    console.log("submitted:", values);
    console.log("form data:", data);
    foods = [...foods, { ...values }];
  };

  const addToCart = (food: Food) => {
    console.log("Added to cart:", food);
    cartItems = [...cartItems, food];
  };

  const removeCartItem = (item: Food) => {
    cartItems = cartItems.filter((ci) => ci.name !== item.name);
  };
</script>

<form on:submit={(e) => handleSubmit(e)}>
  <label>
    Name
    <input name="name" bind:value={name} />
  </label>

  <label>
    Price
    <input name="price" bind:value={price} type="number" />
  </label>

  <button type="submit">Submit</button>
</form>

<Cart items={cartItems} {removeCartItem} />

<div>
  <h1>Foods:</h1>
  <ul>
    {#each foods as food}
      <li>
        <FoodItem {food} {addToCart} />
      </li>
    {/each}
    {Array.from(Array(3).keys())
      .map((num) => {
        return `Kana #${num}`;
      })
      .join(", ")}
  </ul>
</div>
