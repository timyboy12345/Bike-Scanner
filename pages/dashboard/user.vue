<template>
  <div>
    <h1 class="text-lg text-secondary-900">
      Jouw Gegevens
    </h1>

    <p class="text-sm opacity-60 mb-4">
      Bekijk hier wat wij over je weten.
    </p>

    <div class="bg-white rounded divide-y divide-gray-100 shadow">
      <div v-for="[key, value] in fields" class="px-2 py-1">
        <div class="text-sm opacity-60">{{ beautify(key) }}</div>
        <div>{{ value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const {value: user} = useDirectusUser();

const fields = computed(() => Object.entries(user))

useSeoMeta({
  title: 'Jouw Gegevens',
})

function beautify(text: string) {
  if (text === 'id') {
    return 'ID';
  }

  return text.replaceAll('_', ' ').replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase())
}
</script>
