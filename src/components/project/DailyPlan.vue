<script setup>
import {useMealProjectStore} from "@/stores/MealProjectStore.js";
import InteractiveValue from "@/components/utils/InteractiveValue.vue";
import RecipeSelector from "@/components/project/RecipeSelector.vue";

const props = defineProps(["day"])

const mealProjectStore = useMealProjectStore()

const day = mealProjectStore.days[props.day]
const mealNames = mealProjectStore.mealNames

</script>

<template>
  <div>
    <details>
      <summary>{{ day.title }}</summary>
      <div id="mealList">
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
      </div>
    </details>
  </div>
</template>

<style scoped>
#mealList {
  border: 1px solid var(--color-border-hover);
  border-radius: 5px;
  padding: 5px 11px;
  margin: 3px 11px;
}

.mealInfo:not(:last-child) {
  margin-bottom: 7px;
}
</style>