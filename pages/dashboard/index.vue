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
        <div class="opacity-60 mb-2 text-sm">Gescand op: {{ displayDateTime(scans.latestScan.date_created) }}</div>
      </div>
      <div v-else class="mt-4">
        <p class="mb-4">Je staat momenteel nog nergens</p>
        <p class="text-sm opacity-60">
          Begin door hieronder je eerste checkin aan te maken via de knop "Nieuwe Checkin".
        </p>
      </div>
    </div>

    <div class="w-full flex flex-col gap-4">
      <NuxtLink
          class="flex-grow text-center rounded py-2 px-4 bg-secondary-900 text-white hover:bg-secondary-950 transition duration-100"
          href="/dashboard/scan">
        Nieuwe Checkin
      </NuxtLink>
      <NuxtLink
          class="flex-grow text-center rounded py-2 px-4 bg-secondary-900 text-white hover:bg-secondary-950 transition duration-100"
          href="/dashboard/history">
        Geschiedenis
      </NuxtLink>
      <NuxtLink
          class="flex-grow text-center rounded py-2 px-4 bg-gray-200 hover:bg-gray-300 transition duration-100"
          href="/dashboard/user">
        Jouw Gegevens
      </NuxtLink>
      <button
          class="flex-grow text-center rounded py-2 px-4 bg-gray-200 hover:bg-gray-300 transition duration-100"
          @click="logoutDirectus"
      >
        Uitloggen
      </button>
      <p class="text-sm opacity-60 text-center mx-8">
        Je laatste check-in wordt bewaard, zodat je niet hoeft in te loggen om snel te kijken waar je fiets staat.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {displayDateTime} from "~/mixins/generic-mixin";

const {logout} = useDirectusAuth();

definePageMeta({
  middleware: ["auth"]
})

useSeoMeta({
  title: 'Home',
  description: 'Scan de QR codes bij NS fietsenstallingen en vergeet nooit meer waar je je fiets hebt neergezet!',
})

const scans = useScanStore();
const router = useRouter();

function logoutDirectus() {
  scans.reset();
  logout()
      .then(() => {
        router.push('/login')
      });
}
</script>
