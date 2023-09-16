<script lang="ts">
	import { BACKEND_URL } from '$lib/constants';
	import axios from 'axios';
	import Cart from './Cart.svelte';
	import FoodItem from './FoodItem.svelte';
	import type { CartItem, CartType, Food } from './types';

	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	export let data;
	// console.log("data:", data);
	const loadedFoods = data.foodDtos;
	const loadedCartItems = data.cartItems;

	let foods: Food[] = loadedFoods ?? [];

	// let cartItems: CartType = { items: {} };
	let asDict = loadedCartItems.reduce((prev, curr) => {
		return { ...prev, [curr.id]: curr };
	}, {});
	console.log('asDict:', asDict);

	let cartItems: CartType = loadedCartItems ?? [];

	console.log('[UI] cartItems:', cartItems);

	const addToCart = async (food: Food) => {
		console.log('Added to cart:', food);
		try {
			const payload: Omit<CartItem, 'id'> = { food: food, quantity: 1 };
			const response = await axios.post(`${BACKEND_URL}/cart`, payload);
			const newItem = {
				id: response.data.id,
				food,
				quantity: response.data.quantity
			};
			cartItems = [...cartItems, newItem];
		} catch (error) {
			console.log('error adding to cart: ', error);
		}
	};

	const removeCartItem = async (item: CartItem) => {
		console.log('Removed from cart:', item);

		try {
			await axios.delete(`${BACKEND_URL}/cart/${item.id}`);
			cartItems = cartItems.filter((i) => i.id !== item.id);
			console.log('items after delete:', cartItems);
		} catch (error) {
			console.log('failed to delete cart item');
		}
	};

	const incrementCartItem = (item: CartItem) => {
		console.log('Increased cart quantity of:', item);
		changeCartItemQuantity(item.id, 1);
	};

	const decrementCartItem = (item: CartItem) => {
		console.log('Decreased cart quantity of:', item);
		changeCartItemQuantity(item.id, -1);
	};

	const changeCartItemQuantity = async (id: number, change: number) => {
		try {
			const response = await axios.put(`${BACKEND_URL}/cart`, {
				id,
				change
			});
			const updatedItem = response.data;
			cartItems = cartItems.map((i) => {
				if (i.id !== id) return i;
				return updatedItem;
			});
		} catch (error) {
			console.log('failed to change cart item quantity', error);
		}
	};

	const onOrderClicked = async () => {
		const modal: ModalSettings = {
			type: 'confirm',
			title: 'Confirm order',
			body: 'Order foods in the cart. (Nothing will be ordered, this is a test app)',
			response: (r) => {
				if (!r) return;
				onConfirm();
			}
		};
		modalStore.trigger(modal);
	};

	const onConfirm = async () => {
		try {
			await axios.delete(`${BACKEND_URL}/cart`);
			cartItems = [];
		} catch (error) {
			console.log('error confirming:', error);
		}
	};

	$: foodInCart = (foodId: number) => {
		const foodIdsInCart = cartItems.map((i) => i.food.id);
		const exists = foodIdsInCart.some((id) => id === foodId);
		console.log('foodIdsInCart:', foodIdsInCart);
		return exists;
	};
</script>

<i class="fa-solid fa-skull" />
<Cart items={cartItems} {removeCartItem} {incrementCartItem} {decrementCartItem} {onOrderClicked} />

<div>
	<h1>Foods:</h1>
	<ul>
		{#each foods as food}
			<li>
				<FoodItem {food} {addToCart} disabled={foodInCart(food.id)} />
			</li>
		{/each}
	</ul>
</div>
