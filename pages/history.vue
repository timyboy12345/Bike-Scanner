<template>
  <div>
    <NuxtLink href="/" class="text-sm opacity-60 hover:underline">
      < Terug
    </NuxtLink>

    <div>
      <h1 class="text-lg text-indigo-800">
        Geschiedenis
      </h1>

      <div class="flex flex-col gap-2">
        <div class="rounded border border-indigo-800 border-opacity-20 p-2" v-for="c in scans.scans">
          <div class="text-sm opacity-60 mb-1">{{ c.date_created }}</div>
          <div>Rij {{ c.row }}, Plek {{ c.spot }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
})

const scans = useScanStore();
</script>
