<template>
  <div>
    <NuxtLink href="/" class="text-sm opacity-60 hover:underline">
      < Terug
    </NuxtLink>

    <div>
      <h1 class="text-lg text-indigo-800">
        Nieuwe Checkin
      </h1>

      <div id="reader" class="w-full min-h-64 overflow-hidden rounded"></div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {Html5Qrcode} from "html5-qrcode";
const {createItems} = useDirectusItems();

const watcher: any = ref(undefined)
const router = useRouter();
const scans = useScanStore();

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
    var cameraId = devices[0].id;
    startScanning()
  }
}).catch(err => {
  // handle err
});

function startScanning() {
  watcher.value = new Html5Qrcode(/* element id */ "reader");
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
        scans.scans.push(res[0])
        // TODO: Add a pop-up that the scan was successfull
        router.push('/')
      })
      .catch((err) => {
        console.error(err)
      })
}
</script>
