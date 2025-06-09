<template>
  <div>
    <h1 class="text-lg text-secondary-900">
      Nieuw Account Aanmaken
    </h1>

    <p class="opacity-60 mb-4">
      Maak een nieuw account aan, zodat ook jij kan bijhouden waar je fiets staat.
    </p>

    <div class="bg-secondary-900 text-white p-4 rounded my-4">
      Het is momenteel niet mogelijk een account aan te maken!
    </div>

    <form class="flex flex-col gap-4" method="post" @submit.prevent="onSubmit">
      <div v-if="loginError" class="text-sm text-red-800">
        {{ loginError }}
      </div>

      <div class="flex flex-col">
        <label for="firstname">Voornaam</label>
        <input class="rounded" autofocus :class="{'opacity-60': fetching}" type="text" name="firstname" id="firstname"
               v-model="firstName">
      </div>

      <div class="flex flex-col">
        <label for="lastname">Achternaam</label>
        <input class="rounded" :class="{'opacity-60': fetching}" type="text" name="lastname" id="lastname"
               v-model="lastName">
      </div>

      <div class="flex flex-col">
        <label for="email">Email</label>
        <input class="rounded" :class="{'opacity-60': fetching}" type="email" name="email" id="email" v-model="email">
      </div>

      <div class="flex flex-col">
        <label for="password">Wachtwoord</label>
        <input class="rounded" :class="{'opacity-60': fetching}" type="password" name="password" id="password"
               v-model="password">
      </div>

      <button class="rounded bg-secondary-900 text-white hover:bg-secondary-950 transition duration-100 py-2 px-4"
              type="submit"
              :class="{'opacity-60': fetching}">
        Account Aanmaken
      </button>
    </form>

    <NuxtLink href="/login"
              class="text-center rounded mt-4 block py-2 px-4 bg-gray-200 hover:bg-gray-300 transition duration-100">
      Inloggen met Bestaand Account
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const {createUser} = useDirectusAuth();
const {getItems} = useDirectusItems();

const pushes = usePushesStore();

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const loginError = ref()
const fetching = ref(false)

const router = useRouter();
const store = useScanStore();

useSeoMeta({
  title: 'Inloggen',
})

const onSubmit = async () => {
  if (fetching.value) {
    return;
  }

  fetching.value = true;

  pushes.create('Momenteel niet beschikbaar', 'Het is nog niet mogelijk een account aan te maken, vraag een beheerder om het voor je te doen.');

  // TODO: Currently not allowed by Directus
  // try {
  //   await createUser({email: email.value, password: password.value, first_name: firstName, last_name: lastName});
  //   router.push('/')
  //
  //   store.scans = await getItems({
  //     collection: "bike_stores",
  //     params: {
  //       sort: ['-date_created']
  //     }
  //   });
  // } catch (e) {
  //   loginError.value = e
  // }

  fetching.value = false;
};

definePageMeta({
  middleware: ["guest"],
})
</script>
