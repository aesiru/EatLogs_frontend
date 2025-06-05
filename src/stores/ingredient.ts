import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { GlobalIngredient } from '@/types/ingredient'

export const useIngredients = defineStore('ingredients', () => {
    // State
    const ingredients = ref<GlobalIngredient[]>([
        { id: 1, name: 'Flour', defaultUnit: 'g' },
        { id: 2, name: 'Sugar', defaultUnit: 'g' },
        { id: 3, name: 'Salt', defaultUnit: 'tsp' },
    ])
    
    const editDialog = ref(false)
    const currentlyEditing = ref<GlobalIngredient | null>(null)

    // Actions
    function openEditDialog(ingredient: GlobalIngredient) {
        currentlyEditing.value = { ...ingredient }
        editDialog.value = true
    }

    function closeEditDialog() {
        currentlyEditing.value = null
        editDialog.value = false
    }

    function addIngredient(name: string, unit: string) {
        const newId = Math.max(0, ...ingredients.value.map(i => i.id)) + 1
        const newIngredient = { id: newId, name, defaultUnit: unit }
        ingredients.value.push(newIngredient)
        return newId
    }

    function updateIngredient(id: number, updates: Partial<GlobalIngredient>) {
        const index = ingredients.value.findIndex(ing => ing.id === id)
        if (index === -1) return false
        
        ingredients.value[index] = { 
            ...ingredients.value[index],
            ...updates
        }
        return true
    }

    function deleteIngredient(id: number) {
        const index = ingredients.value.findIndex(ing => ing.id === id)
        if (index === -1) return false
        
        ingredients.value.splice(index, 1)
        return true
    }

    return { 
        ingredients,
        editDialog,
        currentlyEditing,
        openEditDialog,
        closeEditDialog,
        addIngredient,
        updateIngredient,
        deleteIngredient
    }
})