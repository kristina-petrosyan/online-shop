import { useState } from "react";
import type { FormEvent } from "react";
import type { MealType, Recipe, RecipeDifficulty } from "../types/recipe.types";
import type { RecipeInput } from "../api/recipes";

export type RecipeFormValues = RecipeInput;

interface RecipeFormProps {
  initialValues?: Recipe;
  submitLabel: string;
  onSubmit: (values: RecipeFormValues) => void | Promise<void>;
  onCancel: () => void;
}

const DIFFICULTIES: RecipeDifficulty[] = ["Easy", "Medium", "Hard"];
const MEAL_TYPES: MealType[] = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];

function toLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function toTags(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function RecipeForm({ initialValues, submitLabel, onSubmit, onCancel }: RecipeFormProps) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [cuisine, setCuisine] = useState(initialValues?.cuisine ?? "");
  const [difficulty, setDifficulty] = useState<RecipeDifficulty>(initialValues?.difficulty ?? "Easy");
  const [servings, setServings] = useState(initialValues?.servings ?? 1);
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(initialValues?.prepTimeMinutes ?? 0);
  const [cookTimeMinutes, setCookTimeMinutes] = useState(initialValues?.cookTimeMinutes ?? 0);
  const [caloriesPerServing, setCaloriesPerServing] = useState(initialValues?.caloriesPerServing ?? 0);
  const [image, setImage] = useState(initialValues?.image ?? "");
  const [ingredients, setIngredients] = useState(initialValues?.ingredients.join("\n") ?? "");
  const [instructions, setInstructions] = useState(initialValues?.instructions.join("\n") ?? "");
  const [tags, setTags] = useState(initialValues?.tags.join(", ") ?? "");
  const [mealType, setMealType] = useState<MealType[]>(initialValues?.mealType ?? []);
  const [submitting, setSubmitting] = useState(false);

  function toggleMealType(meal: MealType) {
    setMealType((current) =>
      current.includes(meal) ? current.filter((item) => item !== meal) : [...current, meal],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    try {
      await onSubmit({
        name,
        cuisine,
        difficulty,
        servings,
        prepTimeMinutes,
        cookTimeMinutes,
        caloriesPerServing,
        image,
        userId: initialValues?.userId ?? 1,
        ingredients: toLines(ingredients),
        instructions: toLines(instructions),
        tags: toTags(tags),
        mealType,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="recipe-form" data-layout="block" onSubmit={handleSubmit}>
      <label className="form-field" data-layout="element">
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>

      <label className="form-field" data-layout="element">
        Cuisine
        <input value={cuisine} onChange={(e) => setCuisine(e.target.value)} required />
      </label>

      <label className="form-field" data-layout="element">
        Difficulty
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as RecipeDifficulty)}>
          {DIFFICULTIES.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>

      <div className="form-row" data-layout="builder">
        <label className="form-field" data-layout="element">
          Servings
          <input
            type="number"
            min={1}
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
          />
        </label>
        <label className="form-field" data-layout="element">
          Prep time (min)
          <input
            type="number"
            min={0}
            value={prepTimeMinutes}
            onChange={(e) => setPrepTimeMinutes(Number(e.target.value))}
          />
        </label>
        <label className="form-field" data-layout="element">
          Cook time (min)
          <input
            type="number"
            min={0}
            value={cookTimeMinutes}
            onChange={(e) => setCookTimeMinutes(Number(e.target.value))}
          />
        </label>
        <label className="form-field" data-layout="element">
          Calories/serving
          <input
            type="number"
            min={0}
            value={caloriesPerServing}
            onChange={(e) => setCaloriesPerServing(Number(e.target.value))}
          />
        </label>
      </div>

      <label className="form-field" data-layout="element">
        Image URL
        <input value={image} onChange={(e) => setImage(e.target.value)} />
      </label>

      <label className="form-field" data-layout="element">
        Ingredients (one per line)
        <textarea rows={5} value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
      </label>

      <label className="form-field" data-layout="element">
        Instructions (one per line)
        <textarea rows={5} value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
      </label>

      <label className="form-field" data-layout="element">
        Tags (comma separated)
        <input value={tags} onChange={(e) => setTags(e.target.value)} />
      </label>

      <fieldset className="form-field" data-layout="element">
        <legend>Meal type</legend>
        {MEAL_TYPES.map((meal) => (
          <label key={meal} className="checkbox-field">
            <input type="checkbox" checked={mealType.includes(meal)} onChange={() => toggleMealType(meal)} />
            {meal}
          </label>
        ))}
      </fieldset>

      <div className="form-actions" data-layout="element">
        <button type="submit" className="btn-view" disabled={submitting}>
          {submitting ? "Saving…" : submitLabel}
        </button>
        <button type="button" className="btn-delete" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default RecipeForm;
