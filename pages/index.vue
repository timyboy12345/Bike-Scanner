<template>
  <div>
    <div class="mb-8 text-center flex flex-col items-center">
      <div v-if="scans.latestScan" class="flex flex-col gap-2">
        <div class="opacity-60 text-sm">Je staat momenteel op</div>
        <div class="flex flex-row justify-center gap-4">
          <div class="flex flex-col">
            <div class="text-sm opacity-60">
              Rij
            </div>
            <div class="text-xl">
              {{ scans.latestScan.row }}
            </div>
          </div>
          <div class="flex flex-col">
            <div class="text-sm opacity-60">
              Plek
            </div>
            <div class="text-xl">
              {{ scans.latestScan.spot }}
            </div>
          </div>
        </div>
        <div class="opacity-60 mb-2 text-sm">Gescand op: {{ scans.latestScan.date_created }}</div>
      </div>
      <div v-else class="opacity-60 mt-4">Je staat momenteel nog nergens</div>
    </div>

    <div class="w-full flex flex-col gap-4 lg:flex-row">
      <NuxtLink
          class="flex-grow text-center rounded py-2 px-4 bg-indigo-800 text-white hover:bg-indigo-900 transition duration-100"
          href="/scan">
        Nieuwe Checkin
      </NuxtLink>
      <NuxtLink
          class="flex-grow text-center rounded py-2 px-4 bg-indigo-800 text-white hover:bg-indigo-900 transition duration-100"
          href="/history">
        Geschiedenis
      </NuxtLink>
      <button
          class="flex-grow text-center rounded py-2 px-4 bg-red-700 text-white hover:bg-red-800 transition duration-100"
          @click="logoutDirectus"
      >
        Uitloggen
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const {logout} = useDirectusAuth();

definePageMeta({
  middleware: ["auth"]
})

const scans = useScanStore();
const router = useRouter();

function logoutDirectus() {
  logout()
      .then(() => {
        // router.push('/login')
        window.location.href = '/login';
      })
}
</script>
