// Replace this with your actual API Gateway endpoint
const API_BASE_URL = 'https://your-api-gateway-url.execute-api.region.amazonaws.com/stage';

export const fetchRecipes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes`);
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
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
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