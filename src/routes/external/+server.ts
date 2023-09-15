import { json } from "@sveltejs/kit";

export const GET = () => {
  return json({ test: 100 });
};
