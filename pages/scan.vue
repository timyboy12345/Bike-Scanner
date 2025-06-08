<template>
  <div>
    <NuxtLink href="/" class="text-sm opacity-60 hover:underline">
      < Terug
    </NuxtLink>

    <div>
      <h1 class="text-lg text-indigo-800">
        Nieuwe Checkin
      </h1>

      <div v-if="!cameraLoaded" class="rounded w-full h-60 bg-gray-200">

      </div>

      <div id="reader" class="w-full min-h-64 overflow-hidden rounded"></div>
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

definePageMeta({
  middleware: ["auth"],
})

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
    watcher.value.stop().then((ignore) => {
      // QR Code scanning is stopped.
      console.log("Stopped scanning QR codes")
      next()
    }).catch((err) => {
      console.error(err)
      // Stop failed, handle it.
      next()
    });
  } else {
    next();
  }
})

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

  console.log(`${location} / ${row} / ${spot}`)

  createItems({
    collection: 'bike_stores',
    items: [{
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
}
</script>
