import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CircleAlert, Loader2, Pencil } from "lucide-react";
import type { Recipe } from "../../types/recipe.types";
import { fetchRecipe, updateRecipe } from "../../api/recipes";
import RecipeForm from "../../components/RecipeForm";
import type { RecipeFormValues } from "../../components/RecipeForm";
import HeaderBlock from "../../blocks/HeaderBlock";
import SidebarPartial from "../../partials/SidebarPartial";
import FooterPartial from "../../partials/FooterPartial";

function RecipeEdit() {
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

  async function handleSubmit(values: RecipeFormValues) {
    if (!id) return;

    try {
      await updateRecipe(Number(id), values);
      navigate(`/recipes/${id}`);
    } catch {
      setError("Could not update recipe.");
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
              <h3 className="panel-title" data-layout="element">
                <Pencil className="icon" size={18} aria-hidden="true" />
                Edit Recipe
              </h3>
              {loading && (
                <p data-state="loading">
                  <Loader2 className="icon icon-spin" size={16} aria-hidden="true" />
                  Loading recipe…
                </p>
              )}
              {error && (
                <p data-state="error">
                  <CircleAlert className="icon" size={16} aria-hidden="true" />
                  {error}
                </p>
              )}
              {recipe && (
                <RecipeForm
                  initialValues={recipe}
                  submitLabel="Save Changes"
                  onSubmit={handleSubmit}
                  onCancel={() => navigate(`/recipes/${id}`)}
                />
              )}
            </div>
          </div>
        </main>

        <FooterPartial />
      </div>
    </section>
  );
}

export default RecipeEdit;
