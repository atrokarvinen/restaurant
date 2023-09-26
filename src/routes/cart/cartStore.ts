import { writable } from 'svelte/store';
import type { Cart } from '../types';

export const defaultCart = { id: -1, items: [] };

export const cartStore = writable<Cart>(defaultCart);
