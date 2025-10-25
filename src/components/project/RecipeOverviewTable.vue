<script setup>
import DailyPlan from "@/components/project/DailyPlan.vue";
import {useMealProjectStore} from "@/stores/MealProjectStore.js";

const mealPlanStore = useMealProjectStore()
const days = mealPlanStore.days
</script>

<template>
  <DailyPlan v-for="i in days.length" :day="i-1"/>
</template>

<style scoped>

</style>