<!-- generate all the cards created for each recipe -->

<script setup>
import RecipeCard from '@/components/recipe-details/RecipeCard.vue'
import { recipes as initialRecipes } from '@/stores/recipe'
import { ref } from 'vue'

const recipes = ref([...initialRecipes])
const successMessage = ref('')
const messageTimeout = ref(null)

// category checked
const isChecked = ref(false)

function toggleFavorite(id) {
  const recipe = recipes.value.find((r) => r.id === id)
  if (recipe) {
    recipe.favorite = !recipe.favorite

    // Show message
    successMessage.value = recipe.favorite
      ? `Successfully added ${recipe.recipe_name} to favorites!`
      : `Successfully removed ${recipe.recipe_name} from favorites!`

    // Clear message after 3 seconds
    clearTimeout(messageTimeout.value)
    messageTimeout.value = setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  }
}

console.log(recipes)
</script>

<template>
  <div class="bg-[#F5ECD5] min-h-screen p-10">
    <transition name="fade">
      <div
        v-if="successMessage"
        class="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      >
        {{ successMessage }}
      </div>
    </transition>
    <p class="font-satisfy text-7xl text-[#626F47] custom-text-shadow-2 text-center mt-5">
      Let's Eat Logs!
    </p>
    <div class="flex flex-row justify-between mt-15 items-start">
      <div class="flex flex-col mt-10 gap-2">
        <!-- categs -->
        <p class="label2">Filter by Category:</p>
        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            v-model="isChecked"
            fill="none"
            class="w-[1.5rem] h-[1.5rem] border-2 border-[#626F47] rounded-[2rem] checked:bg-[#626F47] accent-[#626F47]"
          />
          Cats 1
        </label>
        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            v-model="isChecked"
            fill="none"
            class="w-[1.5rem] h-[1.5rem] border-2 border-[#626F47] rounded-[2rem] checked:bg-[#626F47] accent-[#626F47]"
          />
          Cats 2
        </label>
      </div>
      <div class="flex flex-col">
        <!-- recipes -->
        <div class="flex flex-row justify-between items-center">
          <p class="text-[2.5rem] text-[#626F47] font-[700]">Your Recipes</p>
          <div class="flex flex-row gap-3 text-[#626F47]">
            <RouterLink
              to="/favorites"
              class="flex flex-row p-2 gap-2 border-1 border-[#626F47] font-[600] button-container"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
              >
                <path
                  d="M14.5 1C15.6758 1 16.6711 1.35814 17.5283 2.08203L17.6973 2.23242C18.5902 3.05467 18.9999 3.98292 19 5.06445C19 5.88001 18.7828 6.67964 18.3203 7.47461L18.1074 7.81543C17.4786 8.75281 16.0275 10.2596 13.6514 12.3711L11.0381 14.6064L11.0234 14.6191L11.0098 14.6309C10.7497 14.8703 10.4349 15 10 15C9.56511 15 9.25029 14.8703 8.99023 14.6309L8.96289 14.6074L6.28809 12.3164C4.01462 10.295 2.60131 8.85492 1.95117 7.96094L1.83105 7.79004C1.27327 6.95536 1 6.05426 1 5.06445L1.00488 4.86328C1.05 3.93362 1.41208 3.11889 2.14062 2.3877L2.30273 2.23242C3.19769 1.40829 4.24582 1 5.5 1C6.19611 1 6.83729 1.10804 7.43066 1.31738L7.68262 1.41309C8.3476 1.68796 8.85934 2.0531 9.24512 2.49707L10 3.36621L10.7549 2.49707C11.1363 2.05814 11.6546 1.69263 12.3428 1.41602L12.3418 1.41504C13.035 1.13717 13.7525 1 14.5 1Z"
                  fill="#626F47"
                  stroke="#626F47"
                  stroke-width="2"
                />
              </svg>
              My Favorites
            </RouterLink>
            <RouterLink
              to="/add-recipe"
              class="flex flex-row p-2 gap-2 bg-[#626F47] text-[#F5ECD5] font-[600] button-container"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
              >
                <path
                  d="M9.00032 0.583374C9.46433 0.58346 9.90951 0.767958 10.2376 1.09607L10.3538 1.224C10.609 1.53542 10.7503 1.92722 10.7503 2.33337V7.25037H15.6663C16.1305 7.25037 16.5755 7.43487 16.9036 7.76306L17.0208 7.89099C17.2758 8.20236 17.4163 8.59436 17.4163 9.00037C17.4162 9.46438 17.2318 9.90956 16.9036 10.2377C16.5755 10.5657 16.1303 10.7504 15.6663 10.7504H10.7503V15.6664C10.7503 16.1304 10.5656 16.5755 10.2376 16.9037C9.90951 17.2318 9.46433 17.4163 9.00032 17.4164C8.59432 17.4164 8.20231 17.2759 7.89095 17.0209L7.76302 16.9037C7.43483 16.5755 7.25032 16.1305 7.25032 15.6664V10.7504H2.33333C1.92717 10.7504 1.53537 10.6091 1.22395 10.3539L1.09602 10.2377C0.767912 9.90956 0.583414 9.46438 0.583328 9.00037C0.583328 8.53631 0.767937 8.09123 1.09602 7.76306L1.22395 7.64587C1.53535 7.39075 1.92724 7.25037 2.33333 7.25037H7.25032V2.33337C7.25032 1.86925 7.43483 1.42426 7.76302 1.09607L7.89095 0.979858C8.20236 0.724672 8.59418 0.583374 9.00032 0.583374Z"
                  fill="#F5ECD5"
                  stroke="#F5ECD5"
                />
              </svg>
              Add Recipe
            </RouterLink>
          </div>
        </div>
        <div
          class="w-full h-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10"
        >
          <RecipeCard
            v-for="recipe in recipes"
            :key="recipe.id"
            :id="recipe.id"
            :recipe_name="recipe.recipe_name"
            :cuisine="recipe.cuisine"
            :category="recipe.category"
            :image="recipe.image"
            v-bind="recipe"
            @toggle-favorite="toggleFavorite"
          />
        </div>
      </div>
    </div>
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
</style>