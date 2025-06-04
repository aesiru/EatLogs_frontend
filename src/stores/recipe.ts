import { ref, watch } from 'vue'
import type { Recipe, DefaultRecipes } from '@/types/recipe'
import adoboImg from '@/assets/pictures/adobo.png'
import carbonaraImg from '@/assets/pictures/carbonara.png'
import bicolExpressImg from '@/assets/pictures/bicol-express.png'

const STORAGE_KEY = 'eatlogs-recipes'

// Define default recipes in one place
const DEFAULT_RECIPES: DefaultRecipes = [
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
  { deep: true }
)

export const resetToDefaultRecipes = () => {
  recipes.value = [...DEFAULT_RECIPES]
}