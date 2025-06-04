<script setup>
import RecipeCard from '@/components/recipe-details/RecipeCard.vue'
import { recipes } from '@/stores/recipe'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { handleRecipe } from '@/compostables/handleRecipe'
import { handleNotification } from '@/compostables/handleNotification'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'

const router = useRouter()
const favoriteRecipes = computed(() => {
  return recipes.value.filter(recipe => recipe.favorite)
})

const { successMessage, showMessage } = handleNotification()
const { 
  showConfirmDialog, 
  toggleFavorite,
  recipeIdToDelete,
  signalDelete,
  deleteRecipe,
  cancelDelete 
} = handleRecipe()

function handleDelete(id) {
    console.log('Delete recipe')
    if(deleteRecipe(id)) {
        showMessage("Recipe deleted successfully!")
    }
    setTimeout(() => {
        router.push('/main-recipe-view')
    }, 800)
}

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

</script>

<template>
  <transition name="fade">
    <div
      v-if="successMessage"
      class="success-message"
    >
      {{successMessage}}
    </div>
  </transition>
  <div v-if="favoriteRecipes.length > 0" class="custom-grid">
    <RecipeCard 
      v-for="recipe in favoriteRecipes"
      :key="recipe.id"
      :id="recipe.id"
      :recipe_name="recipe.recipe_name"
      :cuisine="recipe.cuisine"
      :category="recipe.category"
      :image="recipe.image"
      :favorite="recipe.favorite"
      @toggle-favorite="handleFavorite(recipe.id)"
      @delete-recipe="signalDelete(recipe.id)"
    />
    <ConfirmationDialog
      :visible="showConfirmDialog"
      message="Are you sure you want to delete this recipe?"
      @confirm="handleDelete"
      @cancel="cancelDelete"
  />
  </div>
  <div v-else class="flex flex-col items-center gap-10 mt-20 text-[#626F47] text-xl">
    <img src="/src/assets/character/sad-egg.png" alt="sad-egg" class="w-[18rem] h-[20rem]">
    No favorite recipes yet. Heart some recipes to see them here!
  </div>
</template>