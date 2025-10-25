<script setup>
import InteractiveValue from "@/components/utils/InteractiveValue.vue";
import {ref} from "vue";

const dateStart = ref("2025-10-24")
const dateEnd = ref("2025-10-25")
const numberOfPersons = ref(42)
const location = ref("Hartha")
</script>

<template>
  <div>
    <p>
      Zeitraum:
      <InteractiveValue v-model="dateStart" type="date"/>
      -
      <InteractiveValue v-model="dateEnd" type="date"/>
    </p>
    <p>
      Personenanzahl:
      <InteractiveValue v-model="numberOfPersons" type="number"/>
    </p>
    <p>
      Ort:
      <InteractiveValue v-model="location" type="text"/>
    </p>
  </div>
</template>

<style scoped>

</style>