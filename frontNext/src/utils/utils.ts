export const getCraftApi = async (craft_id: string) => {
  console.log("getCraftApi");
  //url parameter craft_id
  const url = `/api/craft?craft_id=${craft_id}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await response.json();
    console.log("api data", data);
    return data;
  } catch (error) {
    // TODO Handle response data
    console.error("Error:", error);
  }
};

export const postCraftApi = async (
  craft_id: string,
  emoji: string,
  label: string
) => {
  console.log("postCraftApi");
  console.log("craft_id", craft_id);
  const url = `/api/craft?craft_id=${craft_id}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ craft_id, emoji, label }),
    });
    console.log(response);
  } catch (error) {
    // TODO Handle response data
    console.error("Error:", error);
  }
};

export const getRecipeApi = async (recipe_id: string) => {
  console.log("getRecipeApi");
  //url parameter recipe_id
  const url = `/api/recipe?recipe_id=${recipe_id}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await response.json();
    console.log("api data", data);
    return data;
  } catch (error) {
    // TODO Handle response data
    console.error("Error:", error);
  }
};

export const postRecipeApi = async (recipe_id: string, craft_id: string) => {
  console.log("postRecipeApi");
  console.log("recipe_id", recipe_id);
  const url = `/api/recipe?recipe_id=${recipe_id}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ recipe_id, craft_id }),
    });
    console.log(response);
  } catch (error) {
    // TODO Handle response data
    console.error("Error:", error);
  }
};
