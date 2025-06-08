<template>
  <div>
    <NuxtLink href="/" class="text-sm opacity-60 hover:underline">
      < Terug
    </NuxtLink>

    <div>
      <h1 class="text-lg text-indigo-800">
        Nieuwe Checkin
      </h1>

      <div class="flex flex-col gap-4 mt-8" v-if="type === 'choose'">
        <button type="button" @click="choose('camera')" class="rounded bg-indigo-800 text-white hover:bg-indigo-900 transition duration-100 py-2 px-4">Scan QR code</button>
        <button type="button" @click="choose('manual')" class="rounded bg-indigo-800 text-white hover:bg-indigo-900 transition duration-100 py-2 px-4">Voer handmatig in</button>
      </div>

      <div v-if="type === 'camera' && !cameraLoaded" class="rounded w-full h-60 bg-gray-200"></div>

      <div v-if="type === 'camera'" id="reader" class="w-full min-h-64 overflow-hidden rounded"></div>
      <form class="flex flex-col gap-4" method="get" v-if="type==='manual'" @submit.prevent="handleManual">
        <div class="flex flex-col">
          <label for="location">Locatie</label>
          <input class="rounded" :class="{'opacity-60': fetching}" placeholder="UO" type="text" name="location" id="location" v-model="location">
        </div>

        <div class="flex flex-col">
          <label for="row">Rij</label>
          <input class="rounded" :class="{'opacity-60': fetching}" placeholder="04" type="text" name="row" id="row" v-model="row">
        </div>

        <div class="flex flex-col">
          <label for="spot">Plek</label>
          <input class="rounded" :class="{'opacity-60': fetching}" placeholder="302" type="text" name="spot" id="spot" v-model="spot">
        </div>

        <button class="rounded bg-indigo-800 text-white hover:bg-indigo-900 transition duration-100 py-2 px-4"
                type="submit"
                :class="{'opacity-60': fetching}">
          Inloggen
        </button>
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
import {Html5Qrcode} from "html5-qrcode";
import {usePushesStore} from "~/stores/pushes";
const {createItems} = useDirectusItems();

const watcher: any = ref(undefined)
const router = useRouter();
const scans = useScanStore();
const pushes = usePushesStore();
const cameraLoaded = ref(false)
const type = ref('choose');

const location = ref('UO');
const row = ref('');
const spot = ref('');
const fetching = ref(false);

definePageMeta({
  middleware: ["auth"],
})

useSeoMeta({
  title: 'Nieuwe checkin toevoegen',
})

function choose(t: string) {
  type.value = t;

  if (t === 'camera') {
    triggerCamera();
  }
}

function triggerCamera() {
  // This method will trigger user permissions
  Html5Qrcode.getCameras().then(devices => {
    /**
     * devices would be an array of objects of type:
     * { id: "id", label: "label" }
     */
    if (devices && devices.length) {
      // var cameraId = devices[0].id;
      startScanning()
    }
  }).catch(err => {
    pushes.create('Camerafout', `Camera kon niet worden geopend, kan niet scannen. "${err}"`)
  });
}

function startScanning() {
  watcher.value = new Html5Qrcode("reader");
  watcher.value.start(
      {facingMode: "environment"},
      {},
      (decodedText: string, decodedResult: any) => {
        // do something when code is read
        console.log(decodedResult)
        handleResult(decodedText)
      },
      (errorMessage: any) => {
        // parse error, ignore it.
        // console.error(errorMessage)
      })
      .catch((err: any) => {
        // Start failed, handle it.
        console.error(err)
      });
  cameraLoaded.value = true;
}

onBeforeRouteLeave((to, from, next) => {
  if (watcher.value) {
    watcher.value.stop().then((ignore: any) => {
      // QR Code scanning is stopped.
      console.log("Stopped scanning QR codes")
      next()
    }).catch((err: any) => {
      console.error(err)
      // Stop failed, handle it.
      next()
    });
  } else {
    next();
  }
})

function handleManual(){
  addCheckin(location.value, row.value, spot.value);
}

function handleResult(text: string) {
  console.log(text)
  watcher.value.stop()
  watcher.value = undefined

  // http://ab9.nl/UO36126
  const data = text.split('/')[3];

  console.log(data);
  const location = data.slice(0, 2);
  const row = data.slice(2, 4);
  const spot = data.slice(4, 7);

  addCheckin(location, row, spot)
}

function addCheckin(location: string, row: string, spot: string){
  console.log(`${location} / ${row} / ${spot}`)

  if (fetching.value) {
    return;
  }

  fetching.value = true;

  createItems({
    collection: 'bike_stores',
    items: [{
      location: location,
      row: row,
      spot: spot
    }]
  })
      .then((res) => {
        console.log(res)
        scans.scans.unshift(res[0])
        pushes.create('Toegevoegd', 'De nieuwe locatie is toegevoegd')
        router.push('/')
      })
      .catch((err) => {
        console.error(err)
      })
      .then(() => {
        fetching.value = false;
      })
}
</script>
