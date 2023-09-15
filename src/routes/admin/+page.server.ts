import prisma from "$lib/server/prisma.js";
import { fail } from "@sveltejs/kit";

console.log("[Admin]");

export const load = async () => {
  const foods = await prisma.food.findMany({});
  return { foods };
};

/** @type {import('./$types').Actions} */
export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();

    const json = Object.fromEntries(data.entries());
    console.log("json:", json);

    const name = data.get("name");
    const price = data.get("price");

    let errors: { name?: string; price?: string } = {};
    if (!price) errors = { ...errors, price: "price is required" };
    if (!name) errors = { ...errors, name: "name is required" };
    if (errors.name || errors.price) {
      return fail(400, { errors });
    }

    const foodToCreate = { name: name!.toString(), price: price ? +price : 0 };
    console.log("foodToCreate:", foodToCreate);

    const createdFood = await prisma.food.create({ data: foodToCreate });
    return { success: true };
  },
  update: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");
    const name = data.get("name");
    const price = data.get("price");

    const foodToUpdate = await prisma.food.findUnique({ where: { id: +id! } });
    await prisma.food.update({
      data: {
        name: name!.toString(),
        price: +price!,
      },
      where: { id: +id! },
    });
    if (!foodToUpdate) {
      return fail(400, { message: "Food to update not found" });
    }
  },
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");
    const deletedFood = await prisma.food.delete({ where: { id: +id! } });
    console.log("deletedFood:", deletedFood);
  },
};
