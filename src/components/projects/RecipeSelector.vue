<script setup>
import {useRecipeStore} from "@/stores/RecipeStore.js";
import {ref} from "vue";

const recipeStore = useRecipeStore()
const model = defineModel()

const recipes = recipeStore.recipes
const edit = ref(false)

function select(e) {
  model.value = e.target.value
}

function startEdit() {
  edit.value = true
}

function stopEdit() {
  edit.value = false
}
</script>

<template>
  <span v-if="!edit" @click="startEdit">
    {{ recipes[model] }}
  </span>
  <span v-if="edit">
    <label for="recipeSelector"></label>
    <select id="recipeSelector" @change="select">
      <option v-for="(recipe, index) in recipes" :value="index" :selected="index === model">{{ recipe }}</option>
    </select>
    <button @click="stopEdit">Bestätigen</button>
  </span>
</template>

<style scoped>
button {
  margin-left: 1lh;
}
</style>