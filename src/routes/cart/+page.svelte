<script lang="ts">
	import { axios } from '$lib/axios';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import type { CartItem } from '../types';
	import Cart from './Cart.svelte';

	let cartItems: CartItem[] = [];

	const removeCartItem = async (item: CartItem) => {
		console.log('Removed from cart:', item);

		try {
			await axios.delete(`/cart/${item.id}`);
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
			const response = await axios.put('/cart', {
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

	const modalStore = getModalStore();

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
			await axios.delete('/cart');
			cartItems = [];
		} catch (error) {
			console.log('error confirming:', error);
		}
	};
</script>

<h1>Cart</h1>

<Cart items={cartItems} {removeCartItem} {incrementCartItem} {decrementCartItem} {onOrderClicked} />
