import { writable } from 'svelte/store';
import type { Cart } from '../types';

export const cartStore = writable<Cart>({ id: -1, items: [] });
