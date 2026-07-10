import { ChefHat } from 'lucide-react'

function HeaderBlock() {
  return (
    <header className="headers" data-layout="block">
      <h2 className="section-title" data-layout="element">
        <ChefHat className="icon" size={28} aria-hidden="true" />
        Recipe Book
      </h2>
      <h4 className="section-subtitle" data-layout="element">
        Discover and manage your favorite recipes
      </h4>
    </header>
  )
}

export default HeaderBlock
