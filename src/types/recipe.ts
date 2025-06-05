export interface Ingredient {
  name: string
  quantity: number
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
  duration: number
  serving: number
  description: string
  procedure: string
  image: string
  date: string
  favorite: boolean
  ingredients: Ingredient[]
  steps: Step[]
  notes?: string
}

// Optional: Type for the default recipes if you need to reference it elsewhere
export type DefaultRecipes = Recipe[]
