<template>
  <div>
    <h1 class="text-lg text-secondary-900">
      Nieuw Account Aanmaken
    </h1>

    <p class="opacity-60 mb-4">
      Maak een nieuw account aan, zodat ook jij kan bijhouden waar je fiets staat.
    </p>

    <form class="flex flex-col gap-4" method="post" @submit.prevent="onSubmit">
      <div v-if="registerError" class="text-sm text-red-800">
        {{ registerError }}
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

    <div class="flex flex-col lg:flex-row gap-4 mt-4">
      <NuxtLink href="/login"
                class="text-center rounded block py-2 px-4 bg-gray-200 hover:bg-gray-300 transition duration-100 grow">
        Inloggen met Bestaand Account
      </NuxtLink>

      <NuxtLink href="/"
                class="text-center rounded block py-2 px-4 bg-gray-200 hover:bg-gray-300 transition duration-100 grow">
        Meer Info
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const pushes = usePushesStore();

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const registerError = ref()
const fetching = ref(false)

const router = useRouter();
const store = useScanStore();

useSeoMeta({
  title: 'Registreren',
})

const onSubmit = async () => {
  if (fetching.value) {
    return;
  }

  if (!email.value || !password.value || !firstName.value || !lastName.value) {
    pushes.create('Ongeldige Gegevens', 'Alle velden zijn verplicht, voer overal wat in');
    return;
  }

  fetching.value = true;

  try {
    const res = await fetch('https://data.arendz.nl/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json",
      },
      body: JSON.stringify({
        email: email.value, password: password.value, first_name: firstName.value, last_name: lastName.value
      })
    })

    if (res.status === 204) {
      router.push('/login')
      pushes.create('Account aangemaakt', 'Je account is aangemaakt, log in met je gegevens om toegang te krijgen tot onze website.');
    } else {
      const response = await res.json();
      console.error(response);
      registerError.value = response.errors ? response.errors.map((e: any) => e.message).join(', ') : response;
    }
  } catch (e) {
    console.error(e)
    registerError.value = e
  }

  fetching.value = false;
};

definePageMeta({
  middleware: ["guest"],
})
</script>
