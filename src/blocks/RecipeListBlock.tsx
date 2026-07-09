import type { Recipe } from '../types/recipe.types'
import RecipeComponent from '../components/RecipeComponent'

interface RecipeListBlockProps {
  recipes: Recipe[]
  onDelete?: (id: number) => void
}

function RecipeListBlock({ recipes, onDelete }: RecipeListBlockProps) {
  return (
    <div className="content" data-layout="block">
      <div className="recipe-list-row" data-layout="builder">
        {recipes.map((recipe) => (
          <RecipeComponent key={recipe.id} recipe={recipe} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}

export default RecipeListBlock
