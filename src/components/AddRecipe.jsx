import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { extractRecipe, saveRecipe } from '../services/api';

function AddRecipe() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleExtract = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await extractRecipe(url);
      console.log(data);
      setPreview(data);
    } catch (err) {
      setError('Failed to extract recipe. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!preview) return;
    
    setSaving(true);
    setError(null);
    try {
      await saveRecipe({
        title: preview.title,
        steps: preview.steps,
        instructions: preview.instructions
      });
      navigate('/'); // Redirect to recipe list after successful save
    } catch (err) {
      setError('Failed to save recipe. Please try again.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-recipe">
      <Link to="/" className="back-link">← Back to Recipe List</Link>
      <h1>Add New Recipe</h1>
      
      <div className="recipe-form">
        <div className="form-group">
          <label htmlFor="url">Recipe URL:</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            className="url-input"
          />
        </div>
        
        <button 
          onClick={handleExtract}
          disabled={loading || !url}
          className="extract-button"
        >
          {loading ? 'Extracting...' : 'Extract Recipe'}
        </button>

        {error && <div className="error-message">{error}</div>}
        
        {preview && (
          <div className="recipe-preview">
            <h2>{preview.title}</h2>
            
            <h3>Steps</h3>
            <ul>
              {preview.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>

            <h3>Instructions</h3>
            <ol>
              {preview.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>

            <button
              onClick={handleSave}
              disabled={saving}
              className="save-recipe-button"
            >
              {saving ? 'Saving...' : 'Save Recipe'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddRecipe; 