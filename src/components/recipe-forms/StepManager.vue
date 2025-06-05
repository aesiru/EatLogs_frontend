<script setup lang="ts">
defineProps<{
  steps: Array<{ description: string }>
}>()

const emit = defineEmits(['add-step', 'remove-step', 'update-step'])
</script>

<template>
  <div>
    <label class="block text-sm font-medium mb-1">Steps:<span class="text-red-500">*</span></label>
    <div class="space-y-2">
      <div v-for="(step, index) in steps" :key="index" class="flex gap-2 items-center">
        <span
          class="bg-[#626F47] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
          >{{ index + 1 }}</span
        >
        <input
          :value="step.description"
          @input="emit('update-step', { index, description: ($event.target as HTMLInputElement).value })"
          type="text"
          class="flex-1 p-2 border border-gray-300 rounded"
          :placeholder="`Step ${index + 1}`"
        />
        <button @click="emit('remove-step', index)" class="text-red-500 hover:text-red-700">
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
      <button @click="emit('add-step')" class="text-[#626F47] hover:text-green-700 text-sm">
        + Add step
      </button>
    </div>
  </div>
</template>