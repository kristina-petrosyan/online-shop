import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { Recipe } from "../../types/recipe.types";
import { deleteRecipe, fetchRecipe } from "../../api/recipes";
import HeaderBlock from "../../blocks/HeaderBlock";
import SidebarPartial from "../../partials/SidebarPartial";
import FooterPartial from "../../partials/FooterPartial";

function RecipeShow() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    fetchRecipe(Number(id))
      .then((data) => {
        if (!cancelled) setRecipe(data);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load this recipe.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleDelete() {
    if (!recipe || !window.confirm("Delete this recipe?")) return;

    try {
      await deleteRecipe(recipe.id);
      navigate("/recipes");
    } catch {
      setError("Could not delete recipe.");
    }
  }

  return (
    <section className="wrapper" data-layout="page">
      <div className="container" data-layout="builder">
        <HeaderBlock />
        <main data-layout="block">
          <div className="row" data-layout="builder">
            <div className="col" data-layout="builder" data-content="panel-aside" data-width="30%">
              <SidebarPartial />
            </div>
            <div className="col" data-layout="builder" data-content="panel-main" data-width="70%">
              {loading && <p data-state="loading">Loading recipe…</p>}
              {error && <p data-state="error">{error}</p>}

              {recipe && (
                <div className="recipe-row" data-layout="component" data-content="Recipe Book">
                  <div className="recipe-row-compact" data-field="summary">
                    <img className="recipe-thumb" data-field="image" src={recipe.image} alt={recipe.name} />

                    <span className="recipe-name" data-field="name">
                      {recipe.name}
                    </span>

                    <span className="recipe-difficulty" data-field="difficulty" data-value={recipe.difficulty}>
                      {recipe.difficulty}
                    </span>

                    <span className="recipe-cuisine" data-field="cuisine">
                      {recipe.cuisine}
                    </span>

                    <span className="recipe-time" data-field="totalTime">
                      {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                    </span>

                    <span className="recipe-calories" data-field="caloriesPerServing">
                      {recipe.caloriesPerServing} cal
                    </span>

                    <span className="recipe-rating" data-field="rating">
                      ★ {recipe.rating.toFixed(1)}
                      <span className="recipe-review-count" data-field="reviewCount">
                        ({recipe.reviewCount})
                      </span>
                    </span>

                    <div className="recipe-row-actions" data-field="actions">
                      <Link className="btn-view" to="/recipes" data-action="back">
                        Back
                      </Link>
                      <Link className="btn-edit" to={`/recipes/${recipe.id}/edit`} data-action="edit">
                        Edit
                      </Link>
                      <button type="button" className="btn-delete" data-action="delete" onClick={handleDelete}>
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="recipe-details-body" data-field="details">
                    <ul className="recipe-ingredients" data-field="ingredients">
                      {recipe.ingredients.map((ingredient) => (
                        <li key={ingredient} data-field="ingredient">
                          {ingredient}
                        </li>
                      ))}
                    </ul>

                    <ol className="recipe-instructions" data-field="instructions">
                      {recipe.instructions.map((step, index) => (
                        <li key={index} data-field="instruction">
                          {step}
                        </li>
                      ))}
                    </ol>

                    <div className="recipe-tags" data-field="tags">
                      {recipe.tags.map((tag) => (
                        <span key={tag} className="tag" data-field="tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="recipe-meal-type" data-field="mealType">
                      {recipe.mealType.map((meal) => (
                        <span key={meal} className="tag" data-field="meal">
                          {meal}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <FooterPartial />
      </div>
    </section>
  );
}

export default RecipeShow;
