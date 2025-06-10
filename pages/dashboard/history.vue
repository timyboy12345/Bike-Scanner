<template>
  <div>
    <div>
      <h1 class="text-lg text-secondary-900">
        Geschiedenis
      </h1>

      <p class="text-sm opacity-60 mb-4">
        Bekijk hier wanneer je je fiets hebt ingecheckt, en wanneer dit was. Wanneer je een onjuiste checkin verwijdert
        kan je deze niet meer terug halen.
      </p>

      <div class="text-center opacity-60" v-if="!scans.scans || scans.scans.length === 0">
        Je bent nog nooit ingecheckt
      </div>

      <div class="flex flex-col gap-2">
        <BikeLocationCard :scan="c" @delete-checkin="deleteCheckin" v-for="c in scans.scans"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BikeLocationCard from "~/components/BikeLocationCard.vue";

const {deleteItems} = useDirectusItems();

definePageMeta({
  middleware: ["auth"]
})

const scans = useScanStore();
const pushes = usePushesStore();

useSeoMeta({
  title: 'Geschiedenis',
})

const c = useCookie('latest-scan', {maxAge: 60 * 60 * 24 * 31})

function deleteCheckin(id: string) {
  // console.log(id)

  deleteItems({
    items: [id],
    collection: 'bike_stores',
  })
      .then(() => {
        scans.deleteScan(id)
        c.value = scans.latestScan
        pushes.create('Checkin verwijderd', 'Deze checkin is verwijderd van jouw lijst')
      })
      .catch((err) => {
        console.error(err)
        pushes.create('Er ging iets fout', err)
      })
}
</script>
