const API_BASE_URL = import.meta.env.VITE_API_URL;
const RECIPES_ENDPOINT = import.meta.env.VITE_API_RECIPES_ENDPOINT;
const EXTRACT_RECIPE_ENDPOINT = import.meta.env.VITE_API_EXTRACT_RECIPE_ENDPOINT;

export const fetchRecipes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}${RECIPES_ENDPOINT}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const fetchRecipeById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}${RECIPES_ENDPOINT}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipe details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};

export const extractRecipe = async (url) => {
  try {
    const response = await fetch(`${API_BASE_URL}${EXTRACT_RECIPE_ENDPOINT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    
    if (!response.ok) {
      throw new Error('Failed to extract recipe');
    }
    
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error extracting recipe:', error);
    throw error;
  }
};

export const saveRecipe = async (recipe) => {
  try {
    const response = await fetch(`${API_BASE_URL}${RECIPES_ENDPOINT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe)
    });
    
    if (!response.ok) {
      throw new Error('Failed to save recipe');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving recipe:', error);
    throw error;
  }
}; 