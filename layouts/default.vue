<template>
  <div class="bg-gray-100 w-screen h-screen overflow-scroll top-0 left-0">
    <div v-if="pushes.firstPush" class="z-10 fixed bottom-4 left-4 right-4 bg-white rounded shadow p-4">
      <div class="font-bold text-secondary-900">{{ pushes.firstPush.title }}</div>
      <div class="text-sm opacity-60">{{ pushes.firstPush.content }}</div>
    </div>

    <div class="m-4 md:m-8 lg:m-8 xl:max-w-xl xl:mx-auto">
      <NuxtLink id="back-arrow" class="flex flex-row items-center text-gray-600 fill-gray-600 text-xs" href="/dashboard" v-if="showBack">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>

        <span>Terug</span>
      </NuxtLink>

      <slot v-if="!user || store.isReady"/>

      <div v-else-if="scansError" class="rounded p-4 bg-white shadow">
        <div class="font-bold text-red-800">Er ging iets fout</div>
        Kon geen gegevens inladen, bekijk de console voor meer info.
      </div>

      <div v-else-if="user" class="fixed top-0 left-0 flex flex-col items-center justify-center gap-4 h-full w-full">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-secondary-900"
             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"/>
          <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"/>
        </svg>

        <p>Scans worden geladen...</p>
      </div>

      <div v-else>
        Laden...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useScanStore} from "~/stores/scans";

const {getItems} = useDirectusItems();

const store = useScanStore();
const pushes = usePushesStore();
const scansError = ref(undefined)
const route = useRoute();

const user = useDirectusUser();
const c = useCookie('latest-scan', {maxAge: 60 * 60 * 24 * 31})

if (user.value) {
  await getItems({
    collection: "bike_stores",
    params: {
      sort: '-date_created'
    },
  })
      .then((d: any[]) => {
        store.init(d)

        c.value = store.latestScan
      })
      .catch((e) => {
        console.error(e)
        scansError.value = e;
        // pushes.create('Kon geen gegevens laden', 'Het is niet gelukt om jouw checkins in te laden')
      });
}

const showBack = computed(() => {
  return !['/', '/login', '/register', '/info', '/dashboard'].includes(route.path)
})

</script>

<style>
#back-arrow:hover > span {
  text-decoration: underline;
}
</style>
