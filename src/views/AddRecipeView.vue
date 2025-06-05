<script setup lang="ts">
// import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { recipes } from '@/stores/recipe'
import { handleNotification } from '@/compostables/handleNotification'
// import { useIngredients } from '@/stores/ingredient'
import { useRecipeForm } from '@/compostables/useRecipeForm'
// components
import RecipeFormHeader from '@/components/recipe-forms/RecipeFormHeader.vue'
import ImageUploader from '@/components/recipe-forms/ImageUploader.vue'
import IngredientManager from '@/components/recipe-forms/IngredientManager.vue'
import StepManager from '@/components/recipe-forms/StepManager.vue'


const router = useRouter()
const { successMessage, showMessage } = handleNotification()

const {
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
} = useRecipeForm()

function saveRecipe() {  
  recipes.value.push(newRecipe.value)  
  showMessage('Recipe added successfully!')
  setTimeout(() => {
    router.push('/main-recipe-view')
  }, 800)
}

function goBack() {
  router.go(-1)
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
  <div class="bg-[#F5ECD5] min-h-screen p-10">
    <RecipeFormHeader 
      title="New Recipe"
      button_label="Save Recipe"
      @save="saveRecipe"
      @go-back="goBack"
    />

    <div class="grid md:grid-cols-2 gap-8">
      <div class="space-y-4">
        <ImageUploader 
          :image="newRecipe.image"
          @upload="handleImageUpload"
          @remove="newRecipe.image = ''"
        />

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
              <option value="Main">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Appetizer">Appetizer</option>
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

        <IngredientManager
          :ingredients="newRecipe.ingredients"
          :selected-ingredient-ids="selectedIngredientIds"
          @add-ingredient="addIngredient"
          @remove-ingredient="removeIngredient"
          @update-ingredient="updateIngredient"
          @update-selected-ids="updateSelectedIds"
        />
      </div>

      <div class="space-y-4">
        <StepManager
          :steps="newRecipe.steps"
          @add-step="addStep"
          @remove-step="removeStep"
          @update-step="updateStep"
        />

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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>