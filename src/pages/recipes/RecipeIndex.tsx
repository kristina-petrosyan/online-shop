import { useEffect, useState } from "react";
import { CircleAlert, Loader2 } from "lucide-react";
import type { Recipe } from "../../types/recipe.types";
import { deleteRecipe, fetchRecipes } from "../../api/recipes";
import HeaderBlock from "../../blocks/HeaderBlock";
import RecipeListBlock from "../../blocks/RecipeListBlock";
import SidebarPartial from "../../partials/SidebarPartial";
import FooterPartial from "../../partials/FooterPartial";

function RecipeIndex() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchRecipes()
      .then((data) => {
        if (!cancelled) setRecipes(data);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load recipes.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this recipe?")) return;

    const previous = recipes;
    setRecipes((current) => current.filter((recipe) => recipe.id !== id));

    try {
      await deleteRecipe(id);
    } catch {
      setRecipes(previous);
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
              {loading && (
                <p data-state="loading">
                  <Loader2 className="icon icon-spin" size={16} aria-hidden="true" />
                  Loading recipes…
                </p>
              )}
              {error && (
                <p data-state="error">
                  <CircleAlert className="icon" size={16} aria-hidden="true" />
                  {error}
                </p>
              )}
              {!loading && !error && <RecipeListBlock recipes={recipes} onDelete={handleDelete} />}
            </div>
          </div>
        </main>

        <FooterPartial />
      </div>
    </section>
  );
}

export default RecipeIndex;
