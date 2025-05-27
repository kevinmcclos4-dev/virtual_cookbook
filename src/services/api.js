const API_BASE_URL = import.meta.env.VITE_API_URL;
const RECIPES_ENDPOINT = import.meta.env.VITE_API_RECIPES_ENDPOINT;

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