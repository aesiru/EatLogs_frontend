<script setup lang="ts">
import { ref } from 'vue'
import { recipes } from '@/stores/recipe'
import type { Recipe } from '@/stores/recipe'

const newRecipe = ref<Recipe>({
  id: Date.now().toString(),
  recipe_name: '',
  cuisine: '',
  category: '',
  duration: 0,
  serving: 0,
  description: '',
  procedure: '',
  image: '', // You can add image upload logic later
  favorite: false,
  ingredients: [],
  steps: [],
  notes: '',
})

function saveRecipe() {
  recipes.push({ ...newRecipe.value, id: Date.now().toString() })
  // Optionally, redirect or clear the form
  alert('Recipe added!')
  newRecipe.value = {
    id: Date.now().toString(),
    recipe_name: '',
    cuisine: '',
    category: '',
    duration: 0,
    serving: 0,
    description: '',
    procedure: '',
    image: '',
    favorite: false,
    ingredients: [],
    steps: [],
    notes: '',
  }
}

function addIngredient() {
  newRecipe.value.ingredients.push({
    name: '',
    unit: 'gram',
  })
}

function removeIngredient(index: number) {
  newRecipe.value.ingredients.splice(index, 1)
}

function addStep() {
  newRecipe.value.steps.push({
    description: '',
  })
}

function removeStep(index: number) {
  newRecipe.value.steps.splice(index, 1)
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold flex items-center">New Recipe</h2>
      <button
        @click="saveRecipe"
        class="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
      >
        Save Recipe
      </button>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <div class="space-y-4">
        <!-- All fields unchanged except icons -->
        <div>
          <label class="block text-sm font-medium mb-1">Name:</label>
          <input
            v-model="newRecipe.recipe_name"
            type="text"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Recipe name"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Category:</label>
            <select
              v-model="newRecipe.category"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">--Select--</option>
              <option value="main">Main Course</option>
              <option value="dessert">Dessert</option>
              <option value="appetizer">Appetizer</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Cuisine:</label>
            <select
              v-model="newRecipe.cuisine"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">--Select--</option>
              <option value="filipino">Filipino</option>
              <option value="italian">Italian</option>
              <option value="chinese">Chinese</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Servings:</label>
            <select
              v-model="newRecipe.serving"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">--Select--</option>
              <option value="1-2">1-2 people</option>
              <option value="3-4">3-4 people</option>
              <option value="5+">5+ people</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Duration:</label>
            <select
              v-model="newRecipe.duration"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">--Minutes--</option>
              <option value="15 min">15 minutes</option>
              <option value="30 min">30 minutes</option>
              <option value="1 hour">1 hour</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Ingredients:</label>
          <div class="space-y-2">
            <div
              v-for="(ingredient, index) in newRecipe.ingredients"
              :key="index"
              class="flex gap-2"
            >
              <input
                v-model="ingredient.name"
                type="text"
                class="flex-1 p-2 border border-gray-300 rounded"
                placeholder="Add new ingredient"
              />
              <select v-model="ingredient.unit" class="p-2 border border-gray-300 rounded">
                <option value="gram">Gram</option>
                <option value="cup">Cup</option>
                <option value="tbsp">Tbsp</option>
              </select>
              <!-- Inline SVG for X (close icon) -->
              <button @click="removeIngredient(index)" class="text-red-500 hover:text-red-700">
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
            <button @click="addIngredient" class="text-green-600 hover:text-green-800 text-sm">
              + Add ingredient
            </button>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Steps:</label>
          <div class="space-y-2">
            <div v-for="(step, index) in newRecipe.steps" :key="index" class="flex gap-2">
              <span
                class="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                >{{ index + 1 }}</span
              >
              <input
                v-model="step.description"
                type="text"
                class="flex-1 p-2 border border-gray-300 rounded"
                :placeholder="`Step ${index + 1}`"
              />
              <!-- Inline X icon -->
              <button @click="removeStep(index)" class="text-red-500 hover:text-red-700">
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
            <button @click="addStep" class="text-green-600 hover:text-green-800 text-sm">
              + Add step
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Notes (Optional):</label>
          <textarea
            v-model="newRecipe.notes"
            class="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Additional notes..."
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
