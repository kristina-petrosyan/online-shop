import { useEffect, useState } from "react";
import { CircleAlert, Loader2 } from "lucide-react";
import type { Recipe } from "../types/recipe.types";
import { fetchRecipesPage } from "../api/recipes";
import HeaderBlock from "../blocks/HeaderBlock";
import RecipeListBlock from "../blocks/RecipeListBlock";
import SidebarPartial from "../partials/SidebarPartial";
import FooterPartial from "../partials/FooterPartial";

const PER_PAGE = 5;

function getPageNumbers(page: number, totalPages: number): (number | "…")[] {
  const pages: (number | "…")[] = [];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  pages.push(1);
  if (start > 2) pages.push("…");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push("…");
  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchRecipesPage((page - 1) * PER_PAGE, PER_PAGE)
      .then((data) => {
        if (!cancelled) {
          setRecipes(data.recipes);
          setTotal(data.total);
        }
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
  }, [page]);

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
              {!loading && !error && (
                <>
                  <RecipeListBlock recipes={recipes} />
                  <nav data-state="pagination" aria-label="Recipe pages">
                    <button
                      type="button"
                      onClick={() => setPage((current) => current - 1)}
                      disabled={page <= 1}
                    >
                      Previous
                    </button>
                    {getPageNumbers(page, totalPages).map((pageNumber, index) =>
                      pageNumber === "…" ? (
                        <span key={`ellipsis-${index}`} aria-hidden="true">
                          …
                        </span>
                      ) : (
                        <button
                          key={pageNumber}
                          type="button"
                          onClick={() => setPage(pageNumber)}
                          aria-current={pageNumber === page ? "page" : undefined}
                          disabled={pageNumber === page}
                        >
                          {pageNumber}
                        </button>
                      ),
                    )}
                    <button
                      type="button"
                      onClick={() => setPage((current) => current + 1)}
                      disabled={page >= totalPages}
                    >
                      Next
                    </button>
                  </nav>
                </>
              )}
            </div>
          </div>
        </main>

        <FooterPartial />
      </div>
    </section>
  );
}

export default HomePage;
