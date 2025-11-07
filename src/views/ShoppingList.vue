<script setup>

import {useMealProjectStore} from "@/stores/MealProjectStore.js";
import {useRecipeStore} from "@/stores/RecipeStore.js";
import useIngredientStore from "@/stores/IngredientStore.js";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import ListSelector from "@/components/utils/ListSelector.vue";

const mealProjectStore = useMealProjectStore()
const recipeStore = useRecipeStore()
const ingredientStore = useIngredientStore()

const {projects} = storeToRefs(mealProjectStore)
const {recipes} = storeToRefs(recipeStore)
const {ingredients, categories} = storeToRefs(ingredientStore)

const selectedProjectId = ref(0)

const usedIngredientList = computed(() => {
  const recipeList = []
  for (let day of projects.value[selectedProjectId.value].days) {
    recipeList.push(...day.meals)
  }

  const ingredientMap = {}
  for (let recipeData of recipeList) {
    const recipe = recipes.value.find(r => r.id === recipeData.recipe)
    for (let ingredient of recipe.ingredients) {
      if (typeof ingredientMap[ingredient.id] !== "number") {
        ingredientMap[ingredient.id] = ingredient.quantity / 10 * recipeData.numberOfPersons
      } else {
        ingredientMap[ingredient.id] += ingredient.quantity / 10 * recipeData.numberOfPersons
      }
    }
  }

  const usedIngredientList = []
  for (let ingredientID in ingredientMap) {
    const ingredient = ingredients.value.find(i => i.id.toString() === ingredientID)
    const categoryID = ingredient.category
    if (typeof usedIngredientList[categoryID] !== "object") {
      usedIngredientList[categoryID] = []
    }
    usedIngredientList[categoryID].push({
      quantity: ingredientMap[ingredientID],
      name: ingredient.name,
      unit: ingredient.unit
    })
  }

  return usedIngredientList
})

function categoryName(id) {
  console.log(id)
  return categories.value.find(c => c.id === id).name
}

</script>

<template>
  <h2>Einkaufsliste <list-selector v-model="selectedProjectId" :select-list="projects" custom-display-property="title"/></h2>
  <br/>
  <div>
    <div v-for="(ingredientList, categoryID) in usedIngredientList">
      <h3>{{ categoryName(categoryID) }}</h3>
      <div class="ingrdientList" v-for="i in ingredientList">
        <p>{{ i.name }}: {{ i.quantity }} {{ i.unit }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ingrdientList {
  margin-left: 15px;
}
</style>