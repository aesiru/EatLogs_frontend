<!-- create a card for each recipe -->

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
const props = defineProps<{
  id: string
  recipe_name: string
  cuisine: string
  category: string
  image: string
  favorite: boolean
}>()

const emit = defineEmits(['toggle-favorite'])

function toggleFavorite() {
  emit('toggle-favorite', props.id)
}
</script>

<template>
  <div class="flex flex-col flex-end card-container">
    <RouterLink :to="`/recipe/${id}`" className="block mb-5">
      <img :src="image" alt="" class="w-[15.2rem] h-[12.6rem]" />
    </RouterLink>

    <div class="flex flex-row justify-between">
      <div class="flex flex-col">
        <p class="label1">{{ recipe_name }}</p>
        <p class="subtext1">{{ cuisine }} | {{ category }}</p>
      </div>

      <div class="flex flex-row items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="16"
          viewBox="0 0 20 16"
          :fill="favorite ? '#626F47' : 'none'"
          @click.stop="toggleFavorite"
        >
          <path
            d="M14.5 1C15.6758 1 16.6711 1.35814 17.5283 2.08203L17.6973 2.23242C18.5902 3.05467 18.9999 3.98292 19 5.06445C19 5.88001 18.7828 6.67964 18.3203 7.47461L18.1074 7.81543C17.4786 8.75281 16.0275 10.2596 13.6514 12.3711L11.0381 14.6064L11.0234 14.6191L11.0098 14.6309C10.7497 14.8703 10.4349 15 10 15C9.56511 15 9.25029 14.8703 8.99023 14.6309L8.96289 14.6074L6.28809 12.3164C4.01462 10.295 2.60131 8.85492 1.95117 7.96094L1.83105 7.79004C1.27327 6.95536 1 6.05426 1 5.06445L1.00488 4.86328C1.05 3.93362 1.41208 3.11889 2.14062 2.3877L2.30273 2.23242C3.19769 1.40829 4.24582 1 5.5 1C6.19611 1 6.83729 1.10804 7.43066 1.31738L7.68262 1.41309C8.3476 1.68796 8.85934 2.0531 9.24512 2.49707L10 3.36621L10.7549 2.49707C11.1363 2.05814 11.6546 1.69263 12.3428 1.41602L12.3418 1.41504C13.035 1.13717 13.7525 1 14.5 1Z"
            stroke="#626F47"
            stroke-width="2"
          />
        </svg>
        <RouterLink to="/edit-recipe">
          <img src="/src/assets/icons/edit-icon.svg" alt="" class="w-[1.25rem] h-[1.25rem]" />
        </RouterLink>
        <img src="/src/assets/icons/delete-icon.svg" alt="" class="w-[1.25rem] h-[1.25rem]" />
      </div>
    </div>
  </div>
</template>
