import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { GlobalIngredient } from '@/types/ingredient'

export const useIngredients = defineStore('ingredients', () => {

    const editDialog = ref(false)
    const currentlyEditing = ref<GlobalIngredient | null>(null) 

    const ingredients = ref<GlobalIngredient[]>([
        { id: 1, name: 'Flour', defaultUnit:'g' },
        { id: 2, name: 'Sugar', defaultUnit:'g' },
        { id: 3, name: 'Salt', defaultUnit:'tsp' },
    
    ])

    function addIngredient(name: string, unit: string) {
        const newId = Math.max(...ingredients.value.map(i => i.id), 0) + 1
        ingredients.value.push({ id: newId, name, defaultUnit: unit })
        return newId
    }

    function deleteIngredient(id: number) {
        const index = ingredients.value.findIndex(ing => ing.id === id)
        if (index !== -1) {
        ingredients.value.splice(index, 1)
        return true
        }
        return false
    }

    function updateIngredientUnit(id: number, newUnit: string) {
        const ingredient = ingredients.value.find(ing => ing.id === id)
        if (ingredient) {
        ingredient.defaultUnit = newUnit
        return true
        }
        return false
    }


    return { ingredients, addIngredient, deleteIngredient, editDialog, currentlyEditing, updateIngredientUnit }
})