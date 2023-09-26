<script lang="ts">
	import { axios } from '$lib/axios';
	import { getErrorMessage } from '$lib/errorHandling';
	import { getModalStore, getToastStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import Cart from './Cart.svelte';
	import { cartStore, defaultCart } from './cartStore';

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

	const toast = getToastStore();
	const onConfirm = async () => {
		try {
			await axios.delete('/cart');
			cartStore.set(defaultCart);
		} catch (error) {
			toast.trigger({
				message: getErrorMessage(error),
				background: 'variant-filled-error',
				timeout: 2000
			});
		}
	};
</script>

<Cart {cart} {onOrderClicked} />
