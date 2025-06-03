import { ref, watch } from 'vue'
import adoboImg from '@/assets/pictures/adobo.png'
import carbonaraImg from '@/assets/pictures/carbonara.png'
import bicolExpressImg from '@/assets/pictures/bicol-express.png'

export interface Ingredient {
  name: string
  unit: string
}

export interface Step {
  description: string
}

export interface Recipe {
  id: string
  recipe_name: string
  cuisine: string
  category: string
  duration: number // in minutes
  serving: number // integer count
  description: string
  procedure: string
  image: string
  favorite: boolean
  ingredients: Ingredient[]
  steps: Step[]
  notes?: string
}

const STORAGE_KEY = 'eatlogs-recipes'

// Try to load from localStorage, fall back to default recipes if none exist
const loadRecipes = () => {
  const savedRecipes = localStorage.getItem(STORAGE_KEY)
  if (savedRecipes) {
    return JSON.parse(savedRecipes)
  }
  return [
    {
      id: "000001",
      recipe_name: "Chicken Adobo",
      cuisine: "Filipino",
      category: "Meat",
      duration: 60,
      serving: 4,
      description: "meow meow",
      procedure: "Step step step",
      image: adoboImg,
      favorite: false,
      ingredients: [],
      steps: [],
    },
    {
      id: "000002",
      recipe_name: "Carbonara",
      cuisine: "Italian",
      category: "Pasta",
      duration: 40,
      serving: 4,
      description: "meow meow",
      procedure: "Step step step",
      image: carbonaraImg,
      favorite: true,
      ingredients: [],
      steps: [],
    },
    {
      id: "000003",
      recipe_name: "Bicol Express",
      cuisine: "Filipino",
      category: "Meat",
      duration: 20,
      serving: 2,
      description: "meow meow",
      procedure: "Step step step",
      image: bicolExpressImg,
      favorite: true,
      ingredients: [],
      steps: [],
    },
  ]
}

// Create a reactive reference to the recipes
export const recipes = ref(loadRecipes()) // Must be a ref

// Watch for changes and save to localStorage
watch(
  recipes,
  (newRecipes) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecipes))
  },
  { deep: true }
)

// Helper function to reset to default recipes if needed
export const resetToDefaultRecipes = () => {
  recipes.value = [
    {
      id: "000001",
      recipe_name: "Chicken Adobo",
      cuisine: "Filipino",
      category: "Meat",
      duration: 60,
      serving: 4,
      description: "meow meow",
      procedure: "Step step step",
      image: adoboImg,
      favorite: false,
      ingredients: [],
      steps: [],
    },
    {
      id: "000002",
      recipe_name: "Carbonara",
      cuisine: "Italian",
      category: "Pasta",
      duration: 40,
      serving: 4,
      description: "meow meow",
      procedure: "Step step step",
      image: carbonaraImg,
      favorite: true,
      ingredients: [],
      steps: [],
    },
    {
      id: "000003",
      recipe_name: "Bicol Express",
      cuisine: "Filipino",
      category: "Meat",
      duration: 20,
      serving: 2,
      description: "meow meow",
      procedure: "Step step step",
      image: bicolExpressImg,
      favorite: true,
      ingredients: [],
      steps: [],
    },
  ]
}