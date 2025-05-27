import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchRecipes } from '../services/api';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecipes = async () => {
      setLoading(true);
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (err) {
        setError('Failed to load recipes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  if (loading) {
    return <div className="recipe-list">Loading recipes...</div>;
  }

  if (error) {
    return <div className="recipe-list">Error: {error}</div>;
  }

  return (
    <div className="recipe-list">
      <h1>My Recipe Collection</h1>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="recipe-card">
            <h2>{recipe.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecipeList; 