<script lang="ts">
  import { BACKEND_URL } from "$lib/constants";
  import { initialFoods } from "$lib/server/databaseSeed";
  import axios from "axios";
  import Cart from "./Cart.svelte";
  import FoodItem from "./FoodItem.svelte";
  import type { CartItem, CartType, Food } from "./types";

  export let data;
  // console.log("data:", data);
  const loadedFoods = data.foodDtos;
  const loadedCartItems = data.cartItems;

  let foods: Food[] = loadedFoods ?? initialFoods;

  // let cartItems: CartType = { items: {} };
  let asDict = loadedCartItems.reduce((prev, curr) => {
    return { ...prev, [curr.id]: curr };
  }, {});
  console.log("asDict:", asDict);

  let cartItems: CartType = loadedCartItems ? { items: asDict } : { items: {} };

  console.log("[UI] cartItems:", cartItems);

  const addToCart = async (food: Food) => {
    console.log("Added to cart:", food);
    try {
      const payload: Omit<CartItem, "id"> = { food: food, quantity: 1 };
      const response = await axios.post(`${BACKEND_URL}/cart`, payload);
      console.log("response: ", response.data);
      cartItems = {
        ...cartItems,
        items: {
          ...cartItems.items,
          [response.data.id]: {
            id: response.data.id,
            food,
            quantity: response.data.quantity,
          },
        },
      };
    } catch (error) {
      console.log("error adding to cart: ", error);
    }
  };

  const removeCartItem = async (item: CartItem) => {
    console.log("Removed from cart:", item);

    try {
      await axios.delete(`${BACKEND_URL}/cart/${item.id}`);
      const items = cartItems.items;
      delete items[item.id];
      cartItems = { ...cartItems, items };
      console.log("items after delete:", cartItems);
    } catch (error) {
      console.log("failed to delete cart item");
    }
  };

  const incrementCartItem = (item: CartItem) => {
    console.log("Increased cart quantity of:", item);
    changeCartItemQuantity(item.id, 1);
  };

  const decrementCartItem = (item: CartItem) => {
    console.log("Decreased cart quantity of:", item);
    changeCartItemQuantity(item.id, -1);
  };

  const changeCartItemQuantity = async (id: number, change: number) => {
    const existingItem = cartItems.items[id];
    cartItems = {
      ...cartItems,
      items: {
        ...cartItems.items,
        [id]: {
          ...existingItem,
          quantity: existingItem.quantity + change,
        },
      },
    };
    try {
      await axios.put(`${BACKEND_URL}/cart`, { id, change });
    } catch (error) {
      console.log("failed to change cart item quantity", error);
    }
  };
</script>

<Cart
  items={cartItems}
  {removeCartItem}
  {incrementCartItem}
  {decrementCartItem}
/>
<button>Order</button>

<div>
  <h1>Foods:</h1>
  <ul>
    {#each foods as food}
      <li>
        <FoodItem {food} {addToCart} />
      </li>
    {/each}
  </ul>
</div>
