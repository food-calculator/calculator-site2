<script setup>
import {useRecipeStore} from "@/stores/RecipeStore.js";
import {computed, ref} from "vue";
import ListSelector from "@/components/utils/ListSelector.vue";
import RecipeEditor from "@/components/recipes/RecipeEditor.vue";
import {storeToRefs} from "pinia";

const recipeStore = useRecipeStore()

const currentRecipe = ref(0)

const {recipes} = storeToRefs(recipeStore)

const currentRecipeName = computed(() =>
    recipes.value.find(r => r.id === currentRecipe.value).name
)

function createNewRecipe() {
  let maxID = 0
  for (let recipe of recipeStore.recipes) {
    if (recipe.id > maxID) maxID = recipe.id
  }
  maxID += 1

  recipeStore.recipes.push({
    id: maxID,
    name: "Neues Rezept",
    ingredients: [],
    description: ""
  })

  currentRecipe.value = maxID
}

function deleteRecipe() {
  for (let i = 0; i < recipes.value.length; i++) {
    if (recipes.value[i].id !== currentRecipe.value) continue
    recipes.value.splice(i, 1)
    if (recipes.value.length === 0) createNewRecipe()
    currentRecipe.value = recipes.value[0].id
    break
  }
}
</script>

<template>
  <h2>Rezepte</h2>
  <p>Rezept auswählen:
    <ListSelector v-model="currentRecipe" :select-list="recipeStore.recipes"
                  custom-display-property="name" custom-id-property="id"></ListSelector>
  </p>
  <button @click="deleteRecipe">Rezept <i>{{ currentRecipeName }}</i> Löschen</button>
  <br/>
  <button @click="createNewRecipe">Neues Rezept erstellen</button>
  <RecipeEditor :recipe-id="currentRecipe"/>
</template>

<style scoped>

</style>