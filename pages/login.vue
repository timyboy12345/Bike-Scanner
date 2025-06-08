<template>
  <div>
    <form class="flex flex-col gap-4" method="post" @submit.prevent="onSubmit">
      <h1 class="text-lg text-indigo-800">
        Inloggen
      </h1>

      <p class="opacity-60">
        Log in om op te slaan waar je fiets staat, of om terug te kijken waar je stond. Accounts kunnen momenteel alleen
        worden aangemaakt door beheerders.
      </p>

      <div v-if="loginError" class="text-sm text-red-800">
        {{ loginError }}
      </div>

      <div class="flex flex-col">
        <label for="email">Email</label>
        <input class="rounded" autofocus :class="{'opacity-60': fetching}" type="email" name="email" id="email" v-model="email">
      </div>

      <div class="flex flex-col">
        <label for="password">Wachtwoord</label>
        <input class="rounded" :class="{'opacity-60': fetching}" type="password" name="password" id="password"
               v-model="password">
      </div>

      <button class="rounded bg-indigo-800 text-white hover:bg-indigo-900 transition duration-100 py-2 px-4"
              type="submit"
              :class="{'opacity-60': fetching}">
        Inloggen
      </button>
    </form>
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
    router.push('/')

    store.scans = await getItems({
      collection: "bike_stores",
      sort: '-date_created'
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
