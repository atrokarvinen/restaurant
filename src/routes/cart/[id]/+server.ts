import prisma from "$lib/server/prisma";

export const DELETE = async ({ request, params }) => {
  const { id } = params;
  console.log("params:", params);
  console.log("id:", id);

  const deleted = await prisma.cartItem.delete({ where: { id: +id } });

  console.log("deleted:", deleted);

  return new Response();
};
