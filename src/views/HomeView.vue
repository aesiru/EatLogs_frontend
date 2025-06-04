<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col bg-[#626F47] md:flex-row h-auto md:h-screen">
  <img src="/src/assets/pictures/home-img.png" alt="home-img" class="w-full md:w-1/2 h-64 md:h-full object-cover object-left">

  <div class="w-full md:w-1/2 flex flex-col justify-center items-center gap-8 p-2 md:p-10 text-center">
    <div class="flex flex-col items-center gap-6 lg:gap-15 text-[#F5ECD5] custom-text-shadow">
      <p class="font-satisfy text-5xl md:text-5xl lg:text-9xl">Eat Logs</p>
      <p class="text-center items-center text-xl">Your personal recipe book—A personal cookbook <br>that stays offline, like a trusty kitchen notebook, but digital. </p>
    </div>

    <RouterLink to="/main-recipe-view">
      <div class="flex flex-col bg-[#F5ECD5] text-[#626F47] font-[500] text-[1.5rem] items-center justify-center py-2 px-4 rounded-[1.19rem] shadow h-[4rem] w-[12rem]
            transition-all duration-300 ease-in-out
            hover:scale-105 hover:bg-[#E0D4B8] hover:shadow-md">
        Get Started
      </div>
    </RouterLink>
  </div>
  </div>
</template>

