import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipeById } from '../services/api';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecipe = async () => {
      setLoading(true);
      try {
        const data = await fetchRecipeById(id);
        setRecipe(data);
      } catch (err) {
        setError('Failed to load recipe details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  if (loading) {
    return <div className="recipe-detail">Loading recipe...</div>;
  }

  if (error) {
    return <div className="recipe-detail">Error: {error}</div>;
  }

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
      <h1>{recipe.title}</h1>
      
      <div className="recipe-meta">
        <span className="protein">Protein: {recipe.protein}</span>
        <span className="category">Category: {recipe.category}</span>
      </div>
      
      <section className="steps">
        <h2>Steps</h2>
        <ul>
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
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