<script setup lang="ts">

const props = defineProps({
  title: String
})

</script>

<template>
  <div class="bg-white dark:bg-slate-900 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight label-text dark:text-gray-200">
        {{ props.title }}
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <slot name="form"></slot>
      <slot name="bottom"></slot>
    </div>
  </div>
</template>
