import type { Recipe } from "../types/recipe.types";

const API_URL = import.meta.env.VITE_API_URL as string;

export interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

export type RecipeInput = Omit<Recipe, "id" | "rating" | "reviewCount">;

export async function fetchRecipes(): Promise<Recipe[]> {
  const res = await fetch(`${API_URL}/recipes`);
  if (!res.ok) throw new Error("Failed to load recipes");
  const data: RecipesResponse = await res.json();
  return data.recipes;
}

export async function recipesPaginator(
  skip: number,
  limit: number,
): Promise<RecipesResponse> {
  const res = await fetch(`${API_URL}/recipes?skip=${skip}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to load recipes");
  return res.json();
}

export async function fetchRecipe(id: number): Promise<Recipe> {
  const res = await fetch(`${API_URL}/recipes/${id}`);
  if (!res.ok) throw new Error("Failed to load recipe");
  return res.json();
}

export async function createRecipe(input: RecipeInput): Promise<Recipe> {
  const res = await fetch(`${API_URL}/recipes/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to create recipe");
  return res.json();
}

export async function updateRecipe(
  id: number,
  input: RecipeInput,
): Promise<Recipe> {
  const res = await fetch(`${API_URL}/recipes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to update recipe");
  return res.json();
}

export async function deleteRecipe(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/recipes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete recipe");
}
