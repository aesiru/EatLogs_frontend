<script setup>
import { useRoute, useRouter } from 'vue-router';
import { recipes } from '@/stores/recipe';
import { ref } from 'vue'
import MoreOption from '@/components/MoreOption.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import { handleRecipe } from '@/compostables/handleRecipe';
import { handleNotification } from '@/compostables/handleNotification';

const route = useRoute()
const router = useRouter()
const recipeId = String(route.params.id)

const showMoreOption = ref(false)

const { successMessage, showMessage } = handleNotification()
const { 
  showConfirmDialog, 
  toggleFavorite,
  recipeIdToDelete,
  signalDelete,
  deleteRecipe,
  cancelDelete 
} = handleRecipe()

// Access the reactive array with .value
const recipe = recipes.value.find(r => r.id === recipeId)

// console.log('Current recipe:', recipe) // Debug log
// console.log('All recipes:', recipes.value) // Debug log

function goBack() {
  router.back();
}

function toggleOption() {
    showMoreOption.value = !showMoreOption.value
}

function handleEdit() {
  console.log('Edit recipe')
  showMoreOption.value = false
  router.push(`/edit-recipe/${recipeId}`)
}

function handleDelete() {
    showMoreOption.value = false
    console.log('Delete recipe')
    if(deleteRecipe()) {
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
      class="fixed top-5 left-1/2 transform -translate-x-1/2 bg-[#626F47] text-white px-6 py-3 rounded-lg shadow-lg z-50"
    >
      {{successMessage}}
    </div>
  </transition>
    <div class="flex flex-row gap-10 bg-[#F5ECD5] w-full h-full">
        <div class="flex flex-row  items-start justify-center w-[38.7rem] min-h-screen bg-[#F0BB78]">
            <div v-if="recipe" class="p-6">
                <div class="flex flex-row justify-between items-center">
                <!-- back icon -->
                    <button @click="goBack" class="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                            <path d="M49 25.6667H15.9367L24.29 17.29L21 14L7 28L21 42L24.29 38.71L15.9367 30.3333H49V25.6667Z" fill="#626F47"/>
                        </svg>
                    </button>

                    <div class="">
                        <!-- more icon -->
                        <button @click="toggleOption" class="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="51" height="13" viewBox="0 0 51 13" fill="none">
                                <path d="M13 6.5C13 10.0899 10.0899 13 6.5 13C2.91015 13 0 10.0899 0 6.5C0 2.91015 2.91015 0 6.5 0C10.0899 0 13 2.91015 13 6.5Z" fill="#626F47"/>
                                <path d="M32 6.5C32 10.0899 29.0899 13 25.5 13C21.9101 13 19 10.0899 19 6.5C19 2.91015 21.9101 0 25.5 0C29.0899 0 32 2.91015 32 6.5Z" fill="#626F47"/>
                                <path d="M51 6.5C51 10.0899 48.0899 13 44.5 13C40.9101 13 38 10.0899 38 6.5C38 2.91015 40.9101 0 44.5 0C48.0899 0 51 2.91015 51 6.5Z" fill="#626F47"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <MoreOption
                    :show="showMoreOption"
                    @close="showMoreOption = false"
                    @edit="handleEdit"
                    @delete="signalDelete(recipeId)"
                />

                <!-- recipe photo, title -->
                <img :src="recipe.image" alt="" class="w-[34rem] h-[30rem] align-middle mt-5 rounded-3xl">
                <div class="flex flex-row items-center-safe justify-between mt-4">
                    <p class="text-start title1">{{ recipe.recipe_name }}</p>

                    <!-- heart icon -->
                    <button @click="handleFavorite(recipe.id)">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="2.6rem" height="2.2rem" 
                            viewBox="0 0 20 16" 
                            :fill="recipe.favorite ? '#626F47' : 'none'"
                            >
                            <path d="M14.4999 1C15.6757 1 16.6711 1.35814 17.5283 2.08203L17.6972 2.23242C18.5901 3.05467 18.9999 3.98292 18.9999 5.06445C18.9999 5.88001 18.7828 6.67964 18.3203 7.47461L18.1074 7.81543C17.4785 8.75281 16.0274 10.2596 13.6513 12.3711L11.038 14.6064L11.0234 14.6191L11.0097 14.6309C10.7497 14.8703 10.4348 15 9.99994 15C9.56504 15 9.25023 14.8703 8.99017 14.6309L8.96283 14.6074L6.28802 12.3164C4.01456 10.295 2.60125 8.85492 1.95111 7.96094L1.83099 7.79004C1.27321 6.95536 0.999939 6.05426 0.999939 5.06445L1.00482 4.86328C1.04994 3.93362 1.41202 3.11889 2.14056 2.3877L2.30267 2.23242C3.19763 1.40829 4.24576 1 5.49994 1C6.19605 1 6.83723 1.10804 7.4306 1.31738L7.68256 1.41309C8.34754 1.68796 8.85928 2.0531 9.24506 2.49707L9.99994 3.36621L10.7548 2.49707C11.1362 2.05814 11.6546 1.69263 12.3427 1.41602L12.3417 1.41504C13.035 1.13717 13.7524 1 14.4999 1Z" stroke="#626F47" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
                <div class="flex flex-row mt-3 subtext2 gap-[9.87rem]">
                    <div class="flex flex-col">
                        <div class="flex flex-row gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M11.4583 9.375H9.375V2.08333H7.29167V9.375H5.20833V2.08333H3.125V9.375C3.125 11.5833 4.85417 13.375 7.03125 13.5104V22.9167H9.63542V13.5104C11.8125 13.375 13.5417 11.5833 13.5417 9.375V2.08333H11.4583V9.375ZM16.6667 6.25V14.5833H19.2708V22.9167H21.875V2.08333C19 2.08333 16.6667 4.41667 16.6667 6.25Z" fill="#626F47"/>
                            </svg>
                            {{ recipe.cuisine }}
                        </div>
                        <div class="flex flex-row gap-2">
                            {{ recipe.category }}
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <div class="flex flex-row gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M15.625 1.04167H9.375V3.125H15.625V1.04167Z" fill="#626F47"/>
                                <path d="M19.8229 7.69792L21.3021 6.21875C20.8542 5.6875 20.3646 5.1875 19.8333 4.75L18.3542 6.22917C16.7396 4.9375 14.7083 4.16667 12.5 4.16667C7.32292 4.16667 3.125 8.36458 3.125 13.5417C3.125 18.7188 7.3125 22.9167 12.5 22.9167C17.6875 22.9167 21.875 18.7188 21.875 13.5417C21.875 11.3333 21.1042 9.30208 19.8229 7.69792ZM13.5417 14.5833H11.4583V8.33333H13.5417V14.5833Z" fill="#626F47"/>
                            </svg>
                            {{ recipe.duration }} min
                        </div>
                        <div class="flex flex-row gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <g clip-path="url(#clip0_54_21)">
                                <path d="M16.6666 11.4583C18.3958 11.4583 19.7812 10.0624 19.7812 8.33325C19.7812 6.60409 18.3958 5.20825 16.6666 5.20825C14.9375 5.20825 13.5416 6.60409 13.5416 8.33325C13.5416 10.0624 14.9375 11.4583 16.6666 11.4583ZM8.33329 11.4583C10.0625 11.4583 11.4479 10.0624 11.4479 8.33325C11.4479 6.60409 10.0625 5.20825 8.33329 5.20825C6.60413 5.20825 5.20829 6.60409 5.20829 8.33325C5.20829 10.0624 6.60413 11.4583 8.33329 11.4583ZM8.33329 13.5416C5.90621 13.5416 1.04163 14.7603 1.04163 17.1874V19.7916H15.625V17.1874C15.625 14.7603 10.7604 13.5416 8.33329 13.5416ZM16.6666 13.5416C16.3645 13.5416 16.0208 13.5624 15.6562 13.5937C16.8645 14.4687 17.7083 15.6458 17.7083 17.1874V19.7916H23.9583V17.1874C23.9583 14.7603 19.0937 13.5416 16.6666 13.5416Z" fill="#626F47"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_54_21">
                                <rect width="25" height="25" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                            {{ recipe.serving }} people
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="p-6 text-red-700">
                Recipe not found
            </div>
        </div>
        <div class="flex flex-col mt-20 text-[#80551E]">
            <!-- ingerediets -->
            <div class="flex flex-col">
                <p class="label3 label3-1">Ingredients</p>
                <ul class="subtext3 subtext3-1 space-y-2">
                    <li 
                    v-for="(ingredient, index) in recipe.ingredients" 
                    :key="index"
                    class="grid grid-cols-2 gap-30 items-baseline"
                    >
                    <!-- Ingredient name -->
                    <span class="">
                        {{ ingredient.name }}
                    </span>
                    
                    <!-- Measurement and unit -->
                    <div class="flex items-baseline justify-start space-x-1">
                        <span class="">
                        {{ ingredient.quantity }}
                        </span>
                        <span class="">
                        {{ ingredient.unit }}
                        </span>
                    </div>
                    </li>
                </ul>
                </div>
            
            <!-- procedure -->
             <div class="flex flex-col mt-20 items-start justify-items-start">
                <span class="label3 label3-1">Procedure</span>
                <ul class="subtext3 subtext3-1 mt-3">
                <li v-for="(steps, index) in recipe.steps" :key="index">
                    <div class="flex flex-row items-center gap-3 mb-5">
                        <span class="bg-[#626F47] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">{{ index + 1 }}</span>
                        <span class="">{{ steps.description }}</span>
                    </div>
                </li>
                </ul>
            </div>
        </div>

        <ConfirmationDialog
            :visible="showConfirmDialog"
            message="Are you sure you want to delete this recipe?"
            @confirm="handleDelete"
            @cancel="cancelDelete"
        />
    </div>
</template>