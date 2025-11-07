<script setup>
import InteractiveValue from "@/components/utils/InteractiveValue.vue";
import {useMealProjectStore} from "@/stores/MealProjectStore.js";
import {computed} from "vue";

const mealProjectStore = useMealProjectStore()

const {projectId} = defineProps(["projectId"])

const mealNames = computed(() =>
  mealProjectStore.projects[projectId].mealNames
)

function addMeal() {
  mealProjectStore.projects[projectId].mealNames.push("Neue Mahlzeit")
  mealProjectStore.projects[projectId].days.forEach(day => {
    day.meals.push({recipe: 0, numberOfPersons: mealProjectStore.projects[projectId].numberOfPersons})
  })
}

function deleteMeal(id) {
  mealProjectStore.projects[projectId].mealNames.splice(id, 1)
  mealProjectStore.projects[projectId].days.forEach(day => {
    day.meals.splice(id, 1)
  })
}
</script>

<template>
  <div id="mealNames">
    <span class="mealNameContainer" v-for="i in mealNames.length">
      <InteractiveValue v-model="mealNames[i-1]" type="text"/>
      <button class="deleteMeal" @click="() => deleteMeal(i-1)">Löschen</button>
    </span>
    <button @click="addMeal">Mahlzeit hinzufügen</button>
  </div>
</template>

<style scoped>
#mealNames {
  display: flex;
  flex-direction: column;
}

.mealNameContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 11px;
}

.deleteMeal {
  padding: 1px;
  height: max-content;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>