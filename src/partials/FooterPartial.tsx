import { UtensilsCrossed } from 'lucide-react'

function FooterPartial() {
  return (
    <footer className="site-footer" data-layout="block">
      <p data-layout="element">
        <UtensilsCrossed className="icon" size={14} aria-hidden="true" />
        Recipe Book — internal tool
      </p>
    </footer>
  )
}

export default FooterPartial
