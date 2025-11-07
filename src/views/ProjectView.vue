<script setup>
import ProjectMetadata from "@/components/projects/ProjectMetadata.vue";
import RecipeOverviewTable from "@/components/projects/RecipeOverviewTable.vue";
import {ref} from "vue";
import ListSelector from "@/components/utils/ListSelector.vue";
import {useMealProjectStore} from "@/stores/MealProjectStore.js";
import InteractiveValue from "@/components/utils/InteractiveValue.vue";

const selectedProject = ref(0)

const mealProjectStore = useMealProjectStore()

function createProject() {
  mealProjectStore.projects.push({
    title: "Neues Projekt",
    mealNames: [],
    dateStart: "2025-01-01",
    dateEnd: "2025-01-01",
    numberOfPersons: 30,
    location: "Ort",
    days: [
      {
        title: "Montag, 2025-01-01",
        meals: [],
      },
    ]
  })

  selectedProject.value = mealProjectStore.projects.length - 1
}

function deleteProject() {
  mealProjectStore.projects.splice(selectedProject.value, 1)
  selectedProject.value = 0
}
</script>

<template>
  <div>
    <div id="projectMenu">
      <div id="currentProject">
        <list-selector :select-list="mealProjectStore.projects" custom-display-property="title" v-model="selectedProject"/>
        <button @click="deleteProject">Projekt Löschen</button>
      </div>
      <button @click="createProject">Neues Projekt</button>
    </div>
    <h2>
      Projekt
      <interactive-value v-model="mealProjectStore.projects[selectedProject].title" type="text"/>
    </h2>
    <ProjectMetadata :project-id="selectedProject"/>
    <hr>
    <RecipeOverviewTable :project-id="selectedProject"/>
  </div>
</template>

<style scoped>
hr {
  margin: 8px 0 4px 0;
  border-top-style: dotted;
  border-width: 3px 0 0 0;
  color: var(--color-border);
}

#projectMenu {
  display: flex;
  justify-content: space-between;
}

#currentProject {
  display: flex;
  gap: 15px
}
</style>