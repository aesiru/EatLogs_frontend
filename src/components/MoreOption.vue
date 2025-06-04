<!-- src/components/MoreOptionsModal.vue -->
<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'edit', 'delete'])

function handleClickOutside(event) {
  if (event.target.classList.contains('modal-overlay')) {
    emit('close')
  }
}
</script>

<template>
  <div v-if="show" 
       @click="handleClickOutside"
       class="modal-overlay fixed inset-0 z-40 flex justify-center items-start pt-10 pr-140">
    
    <div class="bg-[#FFF6E9] rounded-lg shadow-lg w-50 z-50">
      <div class="p-4">
        <button 
          @click="$emit('edit')"
          class="flex flex-row gap-2 items-center w-full py-2 hover:bg-[#f9e09b63] rounded text-[#626F47]">
          <img src="/src/assets/icons/edit-icon.svg" alt="edit-icon" class="w-[1.25rem] h-[1.25rem]">
          Edit Recipe
        </button>
        <button 
          @click="$emit('delete')"
          class="flex flex-row gap-2 items-center w-full py-2 text-red-500 hover:bg-[#f9e09b63] rounded">
            <img src="/src/assets/icons/delete-icon.svg" alt="edit-icon" class="w-[1.25rem] h-[1.25rem]">
          Delete Recipe
        </button>
      </div>
      <div class="border-t border-gray-200 p-2">
        <button 
          @click="$emit('close')"
          class="w-full text-center py-2 hover:bg-gray-100 rounded">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  transition: opacity 0.3s ease;
}
</style>