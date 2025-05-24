import { Link } from 'react-router-dom';
import { recipes } from '../data/recipes';

function RecipeList() {
  return (
    <div className="recipe-list">
      <h1>My Recipe Collection</h1>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="recipe-card">
            <h2>{recipe.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecipeList; 