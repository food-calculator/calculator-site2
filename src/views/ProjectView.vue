<script setup>

import ProjectMetadata from "@/components/project/ProjectMetadata.vue";
import RecipeOverviewTable from "@/components/project/RecipeOverviewTable.vue";
</script>

<template>
  <div>
    <h2>Projekt</h2>
    <ProjectMetadata/>
    <hr>
    <RecipeOverviewTable/>
  </div>
</template>

<style scoped>
hr {
  margin: 8px 0 4px 0;
  border-top-style: dotted;
  border-width: 3px 0 0 0;
  color: var(--color-border);
}
</style>