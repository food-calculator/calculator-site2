<script setup>
import {useMealProjectStore} from "@/stores/MealProjectStore.js";
import InteractiveValue from "@/components/utils/InteractiveValue.vue";
import Expandable from "@/components/utils/Expandable.vue";
import ListSelector from "@/components/utils/ListSelector.vue";
import {useRecipeStore} from "@/stores/RecipeStore.js";
import {computed} from "vue";

const props = defineProps(["day", "projectId"])

const mealProjectStore = useMealProjectStore()
const recipeStore = useRecipeStore()

const day = computed(() => mealProjectStore.projects[props.projectId].days[props.day])
const mealNames = computed(() => mealProjectStore.projects[props.projectId].mealNames)

</script>

<template>
  <div>
    <Expandable :title="day.title">
      <div class="mealInfo" v-for="(meal, index) in day.meals">
        <p>
          {{ mealNames[index] }}:
<!--          <RecipeSelector v-model="meal.recipe"/>-->
          <ListSelector v-model="meal.recipe" custom-id-property="id"
                        custom-display-property="name" :select-list="recipeStore.recipes"/>
        </p>
        <p>
          Personen:
          <InteractiveValue type="number" v-model="meal.numberOfPersons"/>
        </p>
      </div>
    </Expandable>
  </div>
</template>

<style scoped>

.mealInfo:not(:last-child) {
  margin-bottom: 7px;
}
</style>