<script setup>
import RecipeCard from '@/components/recipe-details/RecipeCard.vue'
import { recipes } from '@/stores/recipe'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const favoriteRecipes = computed(() => {
  return recipes.value.filter(recipe => recipe.favorite)
})

function goBack() {
  router.back()
}
</script>

<template>
  <div class="bg-[#F5ECD5] min-h-screen p-10">
    <div class="flex justify-between items-center">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-[#626F47]"
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

      <p class="font-satisfy text-7xl text-[#626F47] text-center flex-grow">
        Favorite Recipes
      </p>
      
      <!-- Empty div for balance -->
      <div class="w-10"></div>
    </div>

    <div v-if="favoriteRecipes.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10">
      <RecipeCard 
        v-for="recipe in favoriteRecipes"
        :key="recipe.id"
        :id="recipe.id"
        :recipe_name="recipe.recipe_name"
        :cuisine="recipe.cuisine"
        :category="recipe.category"
        :image="recipe.image"
        :favorite="recipe.favorite"
        @toggle-favorite="$emit('toggle-favorite', recipe.id)"
      />
    </div>
    <div v-else class="text-center mt-20 text-[#626F47] text-xl">
      No favorite recipes yet. Heart some recipes to see them here!
    </div>
  </div>
</template>