<script lang="ts">
	import { axios } from '$lib/axios';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import Cart from './Cart.svelte';
	import { cartStore } from './cartStore';

	$: cart = $cartStore;

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
			cartStore.set({ id: -1, items: [] });
		} catch (error) {
			console.log('error confirming:', error);
		}
	};
</script>

<h1>Cart</h1>

<Cart {cart} {onOrderClicked} />
