<script setup>
import DailyPlan from "@/components/projects/DailyPlan.vue";
import {useMealProjectStore} from "@/stores/MealProjectStore.js";

const { projectId } = defineProps(["projectId"])

const mealPlanStore = useMealProjectStore()
const days = mealPlanStore.projects[projectId].days
</script>

<template>
  <DailyPlan v-for="i in days.length" :day="i-1" :project-id="projectId"/>
</template>

<style scoped>

</style>