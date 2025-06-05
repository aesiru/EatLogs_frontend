<script setup lang="ts">
defineProps<{
  title: string
  button_label: string
  disabled?: boolean
}>()

const emit = defineEmits(['save', 'goBack'])
</script>

<template>
  <div class="flex justify-between items-center mb-6">
    <div class="flex items-center gap-4">
      <button
        @click="emit('goBack')"
        class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-gray-600"
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
      <h2 class="text-2xl font-bold">{{ title }}</h2>
    </div>
    <div class="flex flex-row gap-5">
        <button
        @click="emit('goBack')"
        class="bg-gray-100 hover:bg-gray-200 text-[#626F47] px-6 py-2 rounded-full transition-transform duration-200 ease-in-out hover:scale-[1.06]"
        >
        Cancel
        </button>
        <button
        @click="emit('save')"
        :class="[
            'px-6 py-2 rounded-full transition-transform duration-200 ease-in-out',
            disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#626F47] hover:scale-[1.06] hover:bg-[#535E3F] text-white'
        ]"
        :disabled="disabled"
        >
        {{ button_label }}
        </button>
    </div>
  </div>
</template>