import { ref } from 'vue'
import { recipes as recipeStore } from '@/stores/recipe'
import type { Recipe } from '@/types/recipe' // You'd define this type

export function handleRecipe() {
    const showConfirmDialog = ref<boolean>(false)
    const recipeIdToDelete = ref<string | null>(null)
  
    const signalDelete = (id: string): void => {
        recipeIdToDelete.value = id
        showConfirmDialog.value = true
    }

    const toggleFavorite = (id: string) => {
        const recipe = recipeStore.value.find((r: Recipe) => r.id === id)
        if (recipe) {
        recipe.favorite = !recipe.favorite
        return recipe // Return the updated recipe for message handling
        }
        return null
    }
  
    const deleteRecipe = (): boolean => {
        if (!recipeIdToDelete.value) return false
        
        recipeStore.value = recipeStore.value.filter(
        (recipe: Recipe) => recipe.id !== recipeIdToDelete.value
        )
        showConfirmDialog.value = false
        recipeIdToDelete.value = null
        return true
    }
    
    const cancelDelete = (): void => {
        showConfirmDialog.value = false
        recipeIdToDelete.value = null
    }
    
    return { 
        showConfirmDialog,
        toggleFavorite, 
        recipeIdToDelete,
        signalDelete,
        deleteRecipe,
        cancelDelete
    }
}