import { ref, watch } from 'vue'
import type { Recipe, DefaultRecipes } from '@/types/recipe'
import adoboImg from '@/assets/pictures/adobo.png'
import carbonaraImg from '@/assets/pictures/carbonara.png'
import bicolExpressImg from '@/assets/pictures/bicol-express.png'
import api from '@/services/api'

const STORAGE_KEY = 'eatlogs-recipes'

api
  .get('recipes/')
  .then((res) => console.log(res.data))
  .catch((err) => console.error('API error:', err))

export const addRecipe = async (recipe: Recipe) => {
  try {
    const response = await api.post('/recipes/', recipe)
    recipes.value.push(response.data)
    return response.data
  } catch (err: any) {
    if (err.response) {
      console.error('API error:', err.response.data)
    }
    err.value = err.message || 'Failed to add recipe'
    throw err
  }
}

export const deleteRecipe = async (id: string) => {
  try {
    await api.delete(`/recipes/${id}/`)
    recipes.value = recipes.value.filter((recipe) => recipe.id !== id)
  } catch (err: any) {
    console.error('Failed to delete recipe:', err.response?.data || err)
    throw err
  }
}

export const updateRecipe = async (updatedRecipe: Recipe) => {
  try {
    const response = await api.put(`/recipes/${updatedRecipe.id}/`, updatedRecipe)
    const index = recipes.value.findIndex((r) => r.id === updatedRecipe.id)
    if (index !== -1) {
      recipes.value[index] = response.data
    }
    return response.data
  } catch (err: any) {
    console.error('Failed to update recipe:', err.response?.data || err)
    throw err
  }
}

// Define default recipes in one place
const DEFAULT_RECIPES: DefaultRecipes = [
  {
    id: '000001',
    recipe_name: 'Chicken Adobo',
    cuisine: 'Filipino',
    category: 'Meat',
    duration: 60,
    serving: 4,
    description: 'meow meow',
    procedure: 'Step step step',
    image: 'https://example.com/images/adobo.png',
    favorite: false,
    date: new Date().toISOString().slice(0, 10),
    ingredients: [],
    steps: [],
    notes: 'This is a note for Chicken Adobo',
  },
  {
    id: '000002',
    recipe_name: 'Carbonara',
    cuisine: 'Italian',
    category: 'Pasta',
    duration: 40,
    serving: 4,
    description: 'meow meow',
    procedure: 'Step step step',
    image: 'https://example.com/images/carbonara.png',
    favorite: true,
    date: new Date().toISOString().slice(0, 10),
    ingredients: [],
    steps: [],
    notes: 'This is a note for Carbonara',
  },
  {
    id: '000003',
    recipe_name: 'Bicol Express',
    cuisine: 'Filipino',
    category: 'Meat',
    duration: 20,
    serving: 2,
    description: 'meow meow',
    procedure: 'Step step step',
    image: 'https://example.com/images/bicol-express.png',
    favorite: true,
    date: new Date().toISOString(),
    ingredients: [],
    steps: [],
    notes: 'This is a note for Bicol Express',
  },
]

const loadRecipes = (): Recipe[] => {
  const savedRecipes = localStorage.getItem(STORAGE_KEY)
  return savedRecipes ? JSON.parse(savedRecipes) : [...DEFAULT_RECIPES]
}

export const recipes = ref<Recipe[]>(loadRecipes())

watch(
  recipes,
  (newRecipes) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecipes))
  },
  { deep: true },
)

export const resetToDefaultRecipes = () => {
  recipes.value = [...DEFAULT_RECIPES]
}
