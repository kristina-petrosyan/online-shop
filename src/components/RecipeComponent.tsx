import { Link } from 'react-router'
import type { Recipe } from '../types/recipe.types'

interface RecipeComponentProps {
  recipe: Recipe
  onDelete?: (id: number) => void
}

function RecipeComponent({ recipe, onDelete }: RecipeComponentProps) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes

  return (
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
          {totalTime} min
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
          <Link className="btn-view" to={`/recipes/${recipe.id}`} data-action="view" data-recipe-id={recipe.id}>
            View
          </Link>
          <Link className="btn-edit" to={`/recipes/${recipe.id}/edit`} data-action="edit" data-recipe-id={recipe.id}>
            Edit
          </Link>
          {onDelete && (
            <button
              type="button"
              className="btn-delete"
              data-action="delete"
              data-recipe-id={recipe.id}
              onClick={() => onDelete(recipe.id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <details className="recipe-details" data-field="details">
        <summary className="recipe-details-toggle">Ingredients &amp; instructions</summary>

        <div className="recipe-details-body">
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
      </details>
    </div>
  )
}

export default RecipeComponent
