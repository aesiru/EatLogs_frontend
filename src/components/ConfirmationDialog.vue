<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: Boolean,
  message: {
    type: String,
    default: 'Delete item?',
  },
})

const emit = defineEmits(['confirm', 'cancel'])

function onConfirm() {
  emit('confirm')
}
function onCancel() {
  emit('cancel')
}
</script>

<template>
  <div v-if="visible" class="fixed inset-0 bg-[#f5e6d285] flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
      <p class="mb-4 text-gray-800 text-lg">{{ message }}</p>
      <div class="flex justify-center gap-4">
        <button @click="onConfirm" class="bg-[#626F47] text-white px-4 py-2 rounded hover:bg-[#A0AA8B]">
          Confirm
        </button>
        <button @click="onCancel" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>