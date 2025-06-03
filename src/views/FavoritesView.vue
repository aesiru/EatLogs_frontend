<script setup>
import RecipeCard from '@/components/recipe-details/RecipeCard.vue'
import { recipes } from '@/stores/recipe'
import { computed } from 'vue'

const favoriteRecipes = computed(() => {
  return recipes.value.filter(recipe => recipe.favorite) // Don't forget .value here
})
</script>

<template>
  <div class="bg-[#F5ECD5] min-h-screen p-10">
    <p class="font-satisfy text-7xl text-[#626F47] text-center mt-5">
      Favorite Recipes
    </p>
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