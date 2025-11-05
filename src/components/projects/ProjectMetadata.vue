<script setup>
import InteractiveValue from "@/components/utils/InteractiveValue.vue";
import MealNameEditor from "@/components/projects/MealNameEditor.vue";
import {useMealProjectStore} from "@/stores/MealProjectStore.js";

const mealProjectStore = useMealProjectStore()
</script>

<template>
  <div id="container">
    <div class="children">
      <p>
        Zeitraum:
        <InteractiveValue v-model="mealProjectStore.dateStart" type="date"/>
        -
        <InteractiveValue v-model="mealProjectStore.dateEnd" type="date"/>
      </p>
      <p>
        Personenanzahl:
        <InteractiveValue v-model="mealProjectStore.numberOfPersons" type="number"/>
      </p>
      <p>
        Ort:
        <InteractiveValue v-model="mealProjectStore.location" type="text"/>
      </p>
    </div>
    <MealNameEditor class="children"/>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.children {
  width: max-content;
}
</style>