<template>
  <div>
    <img alt="Afbeelding van een NS fietsenstalling"
        src="https://www.ns.nl/binaries/_ht_1698138455512/opengraph/content/gallery/ns-nl/landing-hero-afbeeldingen/man-stalt-zijn-fiets.jpeg"
        class="-mt-8 mb-4 max-h-60 w-full object-cover">

    <h1 class="text-lg text-secondary-900">
      Fietsplek Vinden
    </h1>

    <p class="opacity-60 text-sm">Welkom bij Fietsplek Vinden, dé app om je fiets terug te vinden. </p>

    <div class="flex flex-col my-4">
      <p>
        Met deze app scan je makkelijk de QR codes die je in verschillende NS-fietsenstallingen vindt, waarmee je
        makkelijk je fiets terug kan vinden. Zijn er geen QR codes, of is een QR code onleesbaar? Dan kan je ook je
        fiets handmatig registreren. Je moet nog wél altijd handmatig in- en uitchecken.
      </p>

      <h2 class="text-secondary-900 mt-4">Stappenplan</h2>
      <p class="text-sm opacity-60 mb-4">Hieronder lees je hoe het werkt.</p>

      <div class="flex flex-col sm:flex-row gap-2 text-center">
        <div class="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="size-6 mb-2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"/>
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"/>
          </svg>
          <div class="text-secondary-900">1: Aanmelden</div>
          <div class="text-sm opacity-80">Scan de QR code op je fietsenrek, of meld je fiets handmatig aan.</div>
        </div>

        <div class="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="size-6 mb-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>

          <div class="text-secondary-900">2: Ontdekken</div>
          <div class="text-sm opacity-80">Ontdek de stad waar je bent, ga naar het terras of ga iets anders doen.</div>
        </div>

        <div class="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="size-6 mb-2">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
          </svg>

          <div class="text-secondary-900">3: Terugvinden</div>
          <div class="text-sm opacity-80">Terug in de stalling? Open de app en bekijk waar je je fiets had neergezet.
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-4 mt-4">
      <NuxtLink href="/login"
                class="rounded py-2 px-4 text-white bg-secondary-900 hover:bg-secondary-950 transition duration-100 grow text-center">
        Inloggen
      </NuxtLink>
      <NuxtLink href="/register"
                class="rounded py-2 px-4 text-white bg-secondary-900 hover:bg-secondary-950 transition duration-100 grow text-center">
        Account Aanmaken
      </NuxtLink>
    </div>

    <h2 class="text-secondary-900 mt-4">Voorbeelden</h2>
    <p class="text-sm opacity-60">Bekijk hier voorbeelden van de webapplicatie.</p>
    <div class="mt-2 flex flex-row overflow-x-auto gap-4">
      <img alt="Voorbeeld van een scherm van Fietsplek Vinden" v-for="i in images" :src="`/examples/${i}`"
           class="max-w-48 rounded content-center overflow-hidden flex-shrink-0">
    </div>

    <div>
      <h2 class="text-secondary-900 mt-4">Ook beschikbaar als app</h2>
      <p>Voeg deze website toe aan het beginscherm van je telefoon om hem te gebruiken als app. Zo hoef je nooit je
        browser te openen, en kan je sneller je plek scannen.</p>
      <p class="mt-2">Weet je niet hoe dit moet? Lees hier hoe je websites toevoegt aan je
        <a target="_blank" class="underline hover:no-underline text-secondary-800"
           href="https://support.apple.com/nl-nl/guide/iphone/iph42ab2f3a7/ios">iOS device</a> en je <a
            target="_blank" class="underline hover:no-underline text-secondary-800"
            href="https://www.samsung.com/nl/samsung-and-you/Hoe-maak-je-snelkoppelingen-op-je-Android-telefoon/?srsltid=AfmBOordxBN6fF6yc__PoMgRk7NwAsfZ7I8Vtcpu0tW3JnJbyJxyQmlB">Android
          apparaten</a>.</p>
      <p class="mt-2">Overtuigd?
        <NuxtLink class="underline hover:no-underline text-secondary-800" to="/login">Log snel in</NuxtLink>
        of
        <NuxtLink class="underline hover:no-underline text-secondary-800" href="/register">maak een account aan
        </NuxtLink>
        , en vergeet nooit meer waar je fiets stond.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const images = ['home.jpeg', 'new-checkin.PNG', 'camera.PNG', 'history.PNG', 'screen.PNG']

definePageMeta({
  middleware: ["guest"],
})

useSeoMeta({
  title: 'Informatie over BikePark',
})
</script>
