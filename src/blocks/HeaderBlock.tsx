import { ChefHat } from "lucide-react";
import { Link } from "react-router";
function HeaderBlock() {
  return (
    <header className="headers" data-layout="block">
      <h2 className="section-title" data-layout="element">
        <Link to="/">
          <ChefHat className="icon" size={28} aria-hidden="true" />
          <span
            className="link-label"
            style={{ textDecoration: "none", marginLeft: "0.5rem" }}
          >
            Recipe Book
          </span>
        </Link>
      </h2>
      <h4 className="section-subtitle" data-layout="element">
        Discover and manage your favorite recipes
      </h4>
    </header>
  );
}

export default HeaderBlock;
