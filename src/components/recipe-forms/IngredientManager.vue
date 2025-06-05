<script setup lang="ts">
import { ref } from 'vue'
import { useIngredients } from '@/stores/ingredient'
import { handleNotification } from '@/compostables/handleNotification'

const { showMessage, successMessage } = handleNotification()
const ingredientsStore = useIngredients()

const props = defineProps<{
  ingredients: Array<{
    name: string
    quantity: number
    unit: string
  }>
  selectedIngredientIds: (number | null)[]
}>()

const emit = defineEmits([
  'add-ingredient',
  'remove-ingredient',
  'update-ingredient',
  'update-selected-ids'
])

const newIngredientDialog = ref(false)
const newIngredientName = ref('')
const newIngredientUnit = ref('g')

function safeParseIngredientId(value: unknown): number | null {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const parsed = parseInt(value)
    return isNaN(parsed) ? null : parsed
  }
  return null
}

function onIngredientSelected(index: number, eventOrId: Event | number) {
  let ingredientId: number | null = null
  
  if (typeof eventOrId === 'number') {
    ingredientId = eventOrId
  } else {
    const target = eventOrId.target as HTMLSelectElement | null
    const value = target?.value
    ingredientId = safeParseIngredientId(value)
  }
  
  if (ingredientId) {
    const ingredient = ingredientsStore.ingredients.find(i => i.id === ingredientId)
    if (ingredient) {
      emit('update-ingredient', {
        index,
        ingredient: {
          name: ingredient.name,
          quantity: 0,
          unit: ingredient.defaultUnit
        }
      })
    }
  } else {
    // Reset if "Custom" is selected
    emit('update-ingredient', {
      index,
      ingredient: {
        name: '',
        quantity: 0,
        unit: 'g'
      }
    })
  }
  emit('update-selected-ids', { index, id: ingredientId })
}

function confirmNewIngredient() {
  const name = newIngredientName.value.trim()
  
  if (name) {
    const exists = ingredientsStore.ingredients.some(
      ingredient => ingredient.name.toLowerCase() === name.toLowerCase()
    )
    
    if (exists) {
      showMessage('This ingredient already exists!')
      return
    }
    
    const id = ingredientsStore.addIngredient(
      name,
      newIngredientUnit.value
    )
    
    newIngredientName.value = ''
    newIngredientDialog.value = false
    showMessage('Ingredient added successfully!')
    
    return id // Return the new ID for parent component to handle
  }
}

function deleteGlobalIngredient(id: number) {
  if (confirm('Are you sure you want to delete this ingredient? This will remove it from all recipes.')) {
    const success = ingredientsStore.deleteIngredient(id)
    if (success) {
      showMessage('Ingredient deleted successfully!')
    }
  }
}
</script>

<template>
    <transition name="fade">
    <div
      v-if="successMessage"
      class="fixed top-5 left-1/2 transform -translate-x-1/2 bg-[#626F47] text-white px-6 py-3 rounded-lg shadow-lg z-50"
    >
      {{successMessage}}
    </div>
  </transition>
  <div>
    <label class="block text-sm font-medium mb-1">Ingredients:</label>
    <div class="space-y-2">
      <div
        v-for="(ingredient, index) in ingredients"
        :key="index"
        class="flex gap-2"
      >
        <div class="flex-1">
          <select
            :value="selectedIngredientIds[index]"
            @change="onIngredientSelected(index, $event)"
            class="w-full p-2 border border-gray-300 rounded"
          >
            <option :value="null">-- Select Ingredient --</option>
            <option 
              v-for="item in ingredientsStore.ingredients" 
              :key="item.id" 
              :value="item.id"
            >
              {{ item.name }}
            </option>
            <option value="custom">+ Custom Ingredient</option>
          </select>
          
          <input
            v-if="!selectedIngredientIds[index]"
            v-model="ingredient.name"
            type="text"
            class="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="Add custom(new) ingredient"
            @focus="newIngredientDialog = true"
          />
        </div>
        
        <input
          v-model.number="ingredient.quantity"
          type="number"
          min="0"
          step="0.1"
          class="w-24 p-2 border border-gray-300 rounded"
          placeholder="Qty"
        />
        
        <div class="w-20 p-2 text-gray-600 text-sm">
          {{ ingredient.unit }}
        </div>
        
        <button @click="$emit('remove-ingredient', index)" class="text-red-500 hover:text-red-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <button @click="$emit('add-ingredient')" class="text-[#626F47] hover:text-green-700 text-sm">
        + Add ingredient
      </button>
    </div>

    <!-- New Ingredient (insert to ingredients table) Dialog -->
    <dialog v-if="newIngredientDialog" class="fixed inset-0 rounded-4xl button-box-shadow flex items-center justify-center p-4 z-50 mt-100 ml-10">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="font-bold text-lg mb-4">Add New Ingredient</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Name:</label>
            <input
              v-model="newIngredientName"
              type="text"
              class="w-full p-2 border rounded"
              placeholder="e.g. 'Parmesan Cheese'"
              @keyup.enter="confirmNewIngredient"
            />
          </div>
          
          <div>
            <button class="block text-sm font-medium mb-1">Default Unit:</button>
            <select
              v-model="newIngredientUnit"
              class="w-full p-2 border rounded"
            >
              <option value="g">Grams (g)</option>
              <option value="kg">Kilograms (kg)</option>
              <option value="pcs">Pieces (pcs)</option>
              <option value="tsp">Teaspoons (tsp)</option>
              <option value="tbsp">Tablespoons (tbsp)</option>
              <option value="cup">Cups (cup)</option>
            </select>
          </div>
          
          <div class="flex justify-end gap-2 pt-4">
            <button @click="newIngredientDialog = false" class="px-4 py-2 border rounded">
              Cancel
            </button>
            <button 
              @click="confirmNewIngredient" 
              class="px-4 py-2 bg-[#626F47] text-white rounded"
              :disabled="!newIngredientName.trim()"
            >
              Add Ingredient
            </button>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>