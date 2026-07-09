import { useState } from "react";
import { useNavigate } from "react-router";
import { createRecipe } from "../../api/recipes";
import RecipeForm from "../../components/RecipeForm";
import type { RecipeFormValues } from "../../components/RecipeForm";
import HeaderBlock from "../../blocks/HeaderBlock";
import SidebarPartial from "../../partials/SidebarPartial";
import FooterPartial from "../../partials/FooterPartial";

function RecipeCreate() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(values: RecipeFormValues) {
    try {
      const created = await createRecipe(values);
      navigate(`/recipes/${created.id}`);
    } catch {
      setError("Could not create recipe.");
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
                Create Recipe
              </h3>
              {error && <p data-state="error">{error}</p>}
              <RecipeForm submitLabel="Create Recipe" onSubmit={handleSubmit} onCancel={() => navigate("/recipes")} />
            </div>
          </div>
        </main>

        <FooterPartial />
      </div>
    </section>
  );
}

export default RecipeCreate;
