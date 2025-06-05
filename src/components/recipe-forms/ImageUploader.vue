<script setup lang="ts">
defineProps<{
  image: string
}>()

const emit = defineEmits(['upload', 'remove'])
</script>

<template>
  <div>
    <label class="block text-sm font-medium mb-1">Recipe Image:</label>
    <div class="flex items-center gap-4">
      <div
        class="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"
      >
        <img
          v-if="image"
          :src="image"
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
          @change="emit('upload', $event)"
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
          v-if="image"
          @click="emit('remove')"
          class="ml-2 text-red-500 hover:text-red-700 text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>