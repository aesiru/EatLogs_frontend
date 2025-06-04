<script setup>
import RecipeCard from '@/components/recipe-details/RecipeCard.vue'
import { recipes as recipeStore } from '@/stores/recipe' // Store import
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
import { ref } from 'vue'
import { handleRecipe } from '@/compostables/handleRecipe'
import { handleNotification } from '@/compostables/handleNotification'

const { successMessage, showMessage } = handleNotification()
const { 
  showConfirmDialog,
  toggleFavorite, 
  recipeIdToDelete,
  signalDelete,
  deleteRecipe,
  cancelDelete 
} = handleRecipe()

// category checked
const isCategChecked = ref(false)
const isCuisineChecked = ref(false)

// Use the store directly instead of creating a local copy
const recipes = recipeStore // Use the reactive store directly

function handleFavorite(id) {
  const updatedRecipe = toggleFavorite(id)
  if (updatedRecipe) {
    // Show message
    showMessage(
      updatedRecipe.favorite
        ? `Successfully added ${updatedRecipe.recipe_name} to favorites!`
        : `Successfully removed ${updatedRecipe.recipe_name} from favorites!`
    )
  }
}

function handleDelete() {
  const success = deleteRecipe()
  if (success) {
    showMessage('Recipe deleted successfully!')
  }
}

console.log(recipes)
</script>

<template>
  <div>
    <transition name="fade">
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
    </transition>
  </div>
  <div class="custom-grid">
    <RecipeCard
      v-for="recipe in recipes"
      :key="recipe.id"
      :id="recipe.id"
      :recipe_name="recipe.recipe_name"
      :cuisine="recipe.cuisine"
      :category="recipe.category"
      :image="recipe.image"
      :favorite="recipe.favorite"
      v-bind="recipe"
      @toggle-favorite="handleFavorite(recipe.id)"
      @delete-recipe="signalDelete"
    />

    <ConfirmationDialog
      :visible="showConfirmDialog"
      message="Are you sure you want to delete this recipe?"
      @confirm="handleDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>