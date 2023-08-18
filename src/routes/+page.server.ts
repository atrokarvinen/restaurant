export type Food = {
  name: string;
  price: number;
};

let foods: Food[] = [];

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const formData: FormData = await event.request.formData();
    // console.log("formData:", formData);
    const json = Object.fromEntries(formData.entries());
    console.log("json:", json);

    const food: Food = json as any;
    foods.push(food);
    console.log("foods:", foods);
  },
};
