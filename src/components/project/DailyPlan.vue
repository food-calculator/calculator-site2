<script setup>
import {useMealProjectStore} from "@/stores/MealProjectStore.js";
import InteractiveValue from "@/components/utils/InteractiveValue.vue";
import RecipeSelector from "@/components/project/RecipeSelector.vue";
import Expandable from "@/components/utils/Expandable.vue";

const props = defineProps(["day"])

const mealProjectStore = useMealProjectStore()

const day = mealProjectStore.days[props.day]
const mealNames = mealProjectStore.mealNames

</script>

<template>
  <div>
    <Expandable :title="day.title">
      <div class="mealInfo" v-for="(meal, index) in day.meals">
        <p>
          {{ mealNames[index] }}:
          <RecipeSelector v-model="meal.recipe"/>
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