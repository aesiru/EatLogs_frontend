export interface GlobalIngredient {
  id: number
  name: string
  defaultUnit: string
}

export interface RecipeIngredient {
  name: string
  quantity: number
  unit: string
}