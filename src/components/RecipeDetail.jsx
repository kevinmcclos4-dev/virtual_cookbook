import { useParams, Link } from 'react-router-dom';
import { recipes } from '../data/recipes';

function RecipeDetail() {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === parseInt(id));

  if (!recipe) {
    return (
      <div className="recipe-detail">
        <h1>Recipe not found</h1>
        <Link to="/">Back to Recipe List</Link>
      </div>
    );
  }

  return (
    <div className="recipe-detail">
      <Link to="/" className="back-link">← Back to Recipe List</Link>
      <h1>{recipe.name}</h1>
      
      <section className="ingredients">
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section className="steps">
        <h2>Instructions</h2>
        <ol>
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default RecipeDetail; 