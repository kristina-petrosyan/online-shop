import type { ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router'
import { BookOpen, ChevronDown, ListTree, Plus } from 'lucide-react'

// TypeScript's DOM types don't yet include the Invoker Commands API
// (command/commandfor) — cast this button's extra props until they land.
// Must stay lowercase `commandfor`, not camelCase — React only forwards
// unrecognized custom attributes verbatim when they're already lowercase.
type CommandButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  command?: string
  commandfor?: string
}

const navToggleProps = {
  className: 'panel-button',
  'data-layout': 'element',
  'data-category': 'popup trigger',
  command: 'toggle-popover',
  commandfor: 'recipe-nav',
} as CommandButtonProps

function SidebarPartial() {
  return (
    <aside data-layout="block">
      <div className="panel-block" data-layout="block">
        <h3 className="panel-title" data-layout="element">
          <ListTree className="icon" size={18} aria-hidden="true" />
          Recipes
        </h3>
        <div className="panel-content" data-layout="block">
          <button {...navToggleProps}>
            Browse Recipes
            <ChevronDown className="icon" size={16} aria-hidden="true" />
          </button>
          <div
            id="recipe-nav"
            className="drop-down"
            data-layout="block"
            data-category="popup content"
            popover="auto"
          >
            <Link to="/recipes" data-layout="element" data-route="/recipes">
              <BookOpen className="icon" size={16} aria-hidden="true" />
              All Recipes
            </Link>
            <Link to="/recipes/create" data-layout="element" data-route="/recipes/create">
              <Plus className="icon" size={16} aria-hidden="true" />
              Create Recipe
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SidebarPartial
