import { ref } from 'vue'
import type { Recipe } from '@/types/recipe'
import { useIngredients } from '@/stores/ingredient'

export function useRecipeForm(initialRecipe?: Recipe) {
  const ingredientsStore = useIngredients()
  
  const newRecipe = ref<Recipe>(initialRecipe || {
    id: Date.now().toString(),
    recipe_name: '',
    cuisine: '',
    category: '',
    duration: 0,
    serving: 0,
    description: '',
    procedure: '',
    image: '',
    date: '',
    favorite: false,
    ingredients: [],
    steps: [],
    notes: '',
  })

  const selectedIngredientIds = ref<(number | null)[]>([])

  function handleImageUpload(event: Event) {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        newRecipe.value.image = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  function addIngredient() {
    newRecipe.value.ingredients.push({
      name: '',
      quantity: 0,
      unit: 'g'
    })
    selectedIngredientIds.value.push(null)
  }

  function removeIngredient(index: number) {
    newRecipe.value.ingredients.splice(index, 1)
    selectedIngredientIds.value.splice(index, 1)
  }

  function updateIngredient(payload: { index: number, ingredient: { name: string, quantity: number, unit: string } }) {
    newRecipe.value.ingredients[payload.index] = payload.ingredient
  }

  function updateSelectedIds(payload: { index: number, id: number | null }) {
    selectedIngredientIds.value[payload.index] = payload.id
  }

  function addStep() {
    newRecipe.value.steps.push({ description: '' })
  }

  function removeStep(index: number) {
    newRecipe.value.steps.splice(index, 1)
  }

  function updateStep(payload: { index: number, description: string }) {
    newRecipe.value.steps[payload.index].description = payload.description
  }

  return {
    newRecipe,
    selectedIngredientIds,
    handleImageUpload,
    addIngredient,
    removeIngredient,
    updateIngredient,
    updateSelectedIds,
    addStep,
    removeStep,
    updateStep
  }
}