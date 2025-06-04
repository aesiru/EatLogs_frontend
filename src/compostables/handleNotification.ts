import { ref } from 'vue'

export function handleNotification() {
  const successMessage = ref<string>('')
  const messageTimeout = ref<number | undefined>(undefined)
  
  const showMessage = (message: string, duration: number = 3000): void => {
  successMessage.value = message
  clearTimeout(messageTimeout.value as number | undefined)
  messageTimeout.value = setTimeout(() => {
    successMessage.value = ''
  }, duration)

  }
  
  return { successMessage, showMessage }
}