import prisma from "$lib/server/prisma";

/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ params }) => {
  const { id } = params;
  console.log("params:", params);
  console.log("id:", id);

  const deleted = await prisma.cartItem.delete({ where: { id: +id } });

  console.log("deleted:", deleted);

  return new Response();
};
