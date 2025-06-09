<template>
  <div>
    <h1 class="text-lg text-secondary-900">
      Inloggen
    </h1>

    <p class="opacity-60 mb-4">
      Log in om op te slaan waar je fiets staat, of om terug te kijken waar je stond.
    </p>

    <form class="flex flex-col gap-4" method="post" @submit.prevent="onSubmit">
      <div v-if="loginError" class="text-sm text-red-800">
        {{ loginError }}
      </div>

      <div class="flex flex-col">
        <label for="email">Email</label>
        <input class="rounded" autofocus :class="{'opacity-60': fetching}" type="email" name="email" id="email"
               v-model="email">
      </div>

      <div class="flex flex-col">
        <label for="password">Wachtwoord</label>
        <input class="rounded" :class="{'opacity-60': fetching}" type="password" name="password" id="password"
               v-model="password">
      </div>

      <button class="rounded bg-secondary-900 text-white hover:bg-secondary-950 transition duration-100 py-2 px-4"
              type="submit"
              :class="{'opacity-60': fetching}">
        Inloggen
      </button>
    </form>

    <div class="flex flex-col lg:flex-row gap-4">
      <NuxtLink href="/register"
                class="text-center rounded mt-4 block py-2 px-4 bg-gray-200 hover:bg-gray-300 transition duration-100 grow">
        Registreren
      </NuxtLink>

      <NuxtLink href="/"
                class="text-center rounded mt-4 block py-2 px-4 bg-gray-200 hover:bg-gray-300 transition duration-100 grow">
        Meer Info
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const {login} = useDirectusAuth();
const {getItems} = useDirectusItems();

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

  try {
    await login({email: email.value, password: password.value});
    router.push('/dashboard')

    store.scans = await getItems({
      collection: "bike_stores",
      params: {
        sort: '-date_created'
      }
    });
  } catch (e) {
    loginError.value = e
  }

  fetching.value = false;
};

definePageMeta({
  middleware: ["guest"],
})
</script>
