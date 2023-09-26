import { writable } from 'svelte/store';
import { UserGroup, type User } from '../types';

type State = User | undefined;

export const authStore = writable<State>();

export const isAdmin = (state: State) => state?.groupId === UserGroup.ADMIN;
export const isCustomer = (state: State) => state?.groupId === UserGroup.CUSTOMER;
export const isLoggedIn = (state: State) => state !== undefined;
