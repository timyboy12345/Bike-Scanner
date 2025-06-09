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
        <div class="rounded border border-gray-200 p-2" v-for="c in scans.scans">
          <div class="text-sm opacity-60 mb-1">{{ displayDateTime(c.date_created) }}</div>
          <div class="text-sm">{{ getBikeShedName(c.location) }}</div>
          <div>Rij {{ c.row }}, Plek {{ c.spot }}</div>
          <button type="button" class="hover:underline mt-2 text-xs text-red-800" @click="deleteCheckin(c.id)">
            Verwijderen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const {deleteItems} = useDirectusItems();
import {displayDateTime, getBikeShedName} from '~/mixins/generic-mixin'

definePageMeta({
  middleware: ["auth"]
})

const scans = useScanStore();
const pushes = usePushesStore();

useSeoMeta({
  title: 'Geschiedenis',
})

function deleteCheckin(id: string) {
  // console.log(id)

  deleteItems({
    items: [id],
    collection: 'bike_stores',
  })
      .then(() => {
        scans.scans = scans.scans.filter((s) => s.id !== id)
        pushes.create('Checkin verwijderd', 'Deze checkin is verwijderd van jouw lijst')
      })
      .catch((err) => {
        console.error(err)
        pushes.create('Er ging iets fout', err)
      })
}
</script>
