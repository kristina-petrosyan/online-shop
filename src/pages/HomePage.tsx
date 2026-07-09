import { useEffect, useState } from "react";
import type { Recipe } from "../types/recipe.types";
import { fetchRecipes } from "../api/recipes";
import HeaderBlock from "../blocks/HeaderBlock";
import RecipeListBlock from "../blocks/RecipeListBlock";
import SidebarPartial from "../partials/SidebarPartial";
import FooterPartial from "../partials/FooterPartial";

function HomePage() {
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

  return (
    <section className="wrapper" data-layout="page">
      <div className="container" data-layout="builder">
        <HeaderBlock />
        <main data-layout="block">
          <div className="row" data-layout="builder">
            <div
              className="col"
              data-layout="builder"
              data-content="panel-aside"
              data-width="30%"
            >
              <SidebarPartial />
            </div>
            <div
              className="col"
              data-layout="builder"
              data-content="panel-main"
              data-width="70%"
            >
              {loading && <p data-state="loading">Loading recipes…</p>}
              {error && <p data-state="error">{error}</p>}
              {!loading && !error && <RecipeListBlock recipes={recipes} />}
            </div>
          </div>
        </main>

        <FooterPartial />
      </div>
    </section>
  );
}

export default HomePage;
