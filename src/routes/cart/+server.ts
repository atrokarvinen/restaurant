import prisma from "$lib/server/prisma";
import { json } from "@sveltejs/kit";
import type { CartItem } from "../types";

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
  const payload: CartItem = await request.json();
  console.log("payload:", payload);

  const createdItem = await prisma.cartItem.create({
    data: {
      quantity: payload.quantity,
      foodId: payload.food.id,
    },
  });

  console.log("created cart item:", createdItem);
  return json(createdItem);
};

export const PUT = async ({ request }) => {
  const payload = await request.json();
  console.log("update payload:");
  const { id, change } = payload;

  const isIncrement = change > 0;
  const abs = Math.abs(change);
  const updatedItem = await prisma.cartItem.update({
    data: {
      quantity: {
        decrement: isIncrement ? undefined : abs,
        increment: isIncrement ? abs : undefined,
      },
    },
    where: { id: id },
    include: {
      food: true,
    },
  });
  console.log("updated item:", updatedItem);

  return json(updatedItem);
};

export const DELETE = async () => {
  console.log("Deleting cart...");
  await prisma.cartItem.deleteMany();
  console.log("Cart deleted");
  return new Response();
};
