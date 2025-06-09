<template>
  <div>
    <div>
      <h1 class="text-lg text-secondary-900">
        Nieuwe Checkin
      </h1>

      <p class="mb-4 text-sm opacity-60">
        Check hier in door je fietslocatie handmatig in te voeren, of door de QR code op het fietsenrek te scannen.
      </p>

      <div class="flex flex-col gap-4" v-if="type === 'choose'">
        <button type="button" @click="choose('camera')"
                class="rounded bg-secondary-900 text-white hover:bg-secondary-950 transition duration-100 py-2 px-4">
          Scan QR code
        </button>
        <button type="button" @click="choose('manual')"
                class="rounded bg-secondary-900 text-white hover:bg-secondary-950 transition duration-100 py-2 px-4">
          Voer handmatig in
        </button>
      </div>

      <div v-if="type === 'camera'" class="flex flex-col w-full gap-4">
        <div id="reader" class="relative flex flex-col justify-center rounded min-h-60 bg-gray-200 overflow-hidden">
          <div v-if="cameraError" class="shadow bg-secondary-900 mx-8 text-white rounded p-4">
            <div>Kon camera niet openen</div>
            <div class="text-sm opacity-60">{{ cameraError }}</div>
          </div>
        </div>
        <button @click="choose('manual')" type="button"
                class="rounded py-2 px-4 bg-gray-200 hover:bg-gray-300 transition duration-100">
          Handmatig invoeren
        </button>
      </div>

      <form class="flex flex-col gap-4" method="get" v-if="type==='manual'" @submit.prevent="handleManual">
        <div class="flex flex-col">
          <label for="location">Locatie</label>
          <input class="rounded" :class="{'opacity-60': fetching}" placeholder="UO" type="text" name="location"
                 id="location" v-model="location">
        </div>

        <div class="flex flex-col">
          <label for="row">Rij</label>
          <input class="rounded" :class="{'opacity-60': fetching}" placeholder="04" type="text" name="row" id="row"
                 v-model="row">
        </div>

        <div class="flex flex-col">
          <label for="spot">Plek</label>
          <input class="rounded" :class="{'opacity-60': fetching}" placeholder="302" type="text" name="spot" id="spot"
                 v-model="spot">
        </div>

        <button class="rounded bg-secondary-900 text-white hover:bg-secondary-950 transition duration-100 py-2 px-4"
                type="submit"
                :class="{'opacity-60': fetching}">
          Opslaan
        </button>

        <button @click="choose('camera')" type="button"
                class="rounded py-2 px-4 bg-gray-200 hover:bg-gray-300 transition duration-100">
          QR Code Scannen
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
const cameraError = ref(undefined)

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
  } else {
    stopCamera();
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
    console.error(err)
    pushes.create('Camerafout', `Camera kon niet worden geopend, kan niet scannen. "${err}"`)
    cameraError.value = err
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

function stopCamera() {
  if (watcher.value) {
    try {
      watcher.value.stop().then((ignore: any) => {
        // QR Code scanning is stopped.
        console.log("Stopped scanning QR codes")
        watcher.value = undefined
      }).catch((err: any) => {
        console.error(err)
        // Stop failed, handle it.
      });
    } catch (e) {
      console.error(e)
    }
  } else {
    console.log("No watcher set")
  }
}

onBeforeRouteLeave((to, from, next) => {
  console.log("Trying to leave");

  stopCamera();
  next();

  console.log("Left")
})

function handleManual() {
  if (!location.value || !row.value || !spot.value) {
    pushes.create('Voer alle gegevens in', 'Je moet je locatie, rij en plaats invullen om door te gaan!');
    return;
  }

  addCheckin(location.value, row.value, spot.value);
}

function handleResult(text: string) {
  console.log(text)

  let pattern = /http:\/\/ab9.nl\/[A-Z]{2}\d{5}/
  if (!pattern.test(text)) {
    pushes.create('Ongeldige QR code', 'Deze QR code wordt niet herkend, probeer hem opnieuw te scannen, of voer handmatig in.');
    return;
  }

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

function addCheckin(location: string, row: string, spot: string) {
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
        router.push('/dashboard')
      })
      .catch((err) => {
        console.error(err)
      })
      .then(() => {
        fetching.value = false;
      })
}
</script>
