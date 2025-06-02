<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { recipes } from '@/stores/recipe'
import type { Recipe } from '@/stores/recipe'

const router = useRouter()
const newRecipe = ref<Recipe>({
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
})

function saveRecipe() {
  recipes.push({ ...newRecipe.value, id: Date.now().toString() })
  router.push('/recipes')
}

function goBack() {
  router.go(-1)
}

function addIngredient() {
  newRecipe.value.ingredients.push({ name: '', unit: '' })
}

function removeIngredient(index: number) {
  newRecipe.value.ingredients.splice(index, 1)
}

function addStep() {
  newRecipe.value.steps.push({ description: '' })
}

function removeStep(index: number) {
  newRecipe.value.steps.splice(index, 1)
}

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
</script>

<template>
  <div class="bg-[#F5ECD5] min-h-screen p-10">
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-4">
        <!-- Back/Close Button -->
        <button
          @click="goBack"
          class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 class="text-2xl font-bold">New Recipe</h2>
      </div>
      <button
        @click="saveRecipe"
        class="bg-[#626F47] text-white px-6 py-2 rounded-full hover:bg-green-700 hover:text-white transition"
      >
        Save Recipe
      </button>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <div class="space-y-4">
        <!-- Image Upload Section -->
        <div>
          <label class="block text-sm font-medium mb-1">Recipe Image:</label>
          <div class="flex items-center gap-4">
            <div
              class="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"
            >
              <img
                v-if="newRecipe.image"
                :src="newRecipe.image"
                alt="Recipe preview"
                class="w-full h-full object-cover rounded-lg"
              />
              <div v-else class="text-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8 mx-auto mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span class="text-xs">No image</span>
              </div>
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="hidden"
                id="image-upload"
              />
              <label
                for="image-upload"
                class="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg border transition"
              >
                Choose Image
              </label>
              <button
                v-if="newRecipe.image"
                @click="newRecipe.image = ''"
                class="ml-2 text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

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
              <option value="American">American</option>
              <option value="Brazilian">Brazilian</option>
              <option value="Chinese">Chinese</option>
              <option value="Ethiopian">Ethiopian</option>
              <option value="Filipino">Filipino</option>
              <option value="French">French</option>
              <option value="Greek">Greek</option>
              <option value="Indian">Indian</option>
              <option value="Italian">Italian</option>
              <option value="Japanese">Japanese</option>
              <option value="Korean">Korean</option>
              <option value="Mexican">Mexican</option>
              <option value="Middle Eastern">Middle Eastern</option>
              <option value="Moroccan">Moroccan</option>
              <option value="Spanish">Spanish</option>
              <option value="Thai">Thai</option>
              <option value="Vietnamese">Vietnamese</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Servings:</label>
            <input
              v-model.number="newRecipe.serving"
              type="number"
              min="1"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Number of servings"
            />
          </div>
          <div>
          <label class="block text-sm font-medium mb-1">Duration (minutes):</label>
          <input
            v-model.number="newRecipe.duration"
            type="number"
            min="1"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Duration in minutes"
          />
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
            <button @click="addIngredient" class="text-[#626F47] hover:text-green-700 text-sm">
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
            <button @click="addStep" class="text-[#626F47] hover:text-green-700 text-sm">
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
