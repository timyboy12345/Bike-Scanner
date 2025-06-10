<template>
    <div class="rounded border border-gray-200 p-2">
      <div class="text-sm opacity-60 mb-1">{{ displayDateTime(scan.date_created) }}</div>
      <div class="text-sm">{{ getBikeShedName(scan.location) }}</div>
      <div>Rij {{ scan.row }}, Plek {{ scan.spot }}</div>
      <button v-if="showDelete" type="button" class="hover:underline mt-2 text-xs text-red-800" @click="emit('deleteCheckin', scan.id)">
        Verwijderen
      </button>
    </div>
</template>

<script setup lang="ts">
import {displayDateTime, getBikeShedName} from "~/mixins/generic-mixin";
const props = defineProps({
  scan: {
    type: Object,
    required: true
  },
  showDelete: {
    type: Boolean,
    required: false,
    default: true
  }
})

const emit = defineEmits(['deleteCheckin'])
</script>
