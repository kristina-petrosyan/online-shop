import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { CircleAlert, Eye, Loader2, Pencil, Trash2 } from "lucide-react";
import type { Recipe } from "../../types/recipe.types";
import { deleteRecipe, fetchRecipe, updateRecipe } from "../../api/recipes";
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

    // Guards against setting state from a stale fetch if `id` changes or the component unmounts before it resolves.
    let cancelled = false;

    const loadRecipe = async () => {
      try {
        const data = await fetchRecipe(Number(id));

        if (!cancelled) {
          setRecipe(data);
        }
      } catch {
        if (!cancelled) {
          setError("Could not load this recipe.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadRecipe();

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

  async function handleDelete() {
    if (!id || !window.confirm("Delete this recipe?")) return;

    try {
      await deleteRecipe(Number(id));
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
              <div className="panel-header" data-layout="element">
                <h3 className="panel-title" data-layout="element">
                  <Pencil className="icon" size={18} aria-hidden="true" />
                  Edit Recipe
                </h3>
                {recipe && (
                  <div className="panel-header-actions" data-layout="element">
                    {/* rel="noopener noreferrer" stops the new tab from accessing window.opener and redirecting this edit page. */}
                    <Link
                      className="btn-view"
                      to={`/recipes/${id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-action="view"
                    >
                      <Eye className="icon" size={14} aria-hidden="true" />
                      View
                    </Link>
                    <button type="button" className="btn-delete" data-action="delete" onClick={handleDelete}>
                      <Trash2 className="icon" size={14} aria-hidden="true" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
              {loading && (
                <p data-state="loading">
                  <Loader2
                    className="icon icon-spin"
                    size={16}
                    aria-hidden="true"
                  />
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
