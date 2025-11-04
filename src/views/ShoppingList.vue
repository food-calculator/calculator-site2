<script setup>

import {useMealProjectStore} from "@/stores/MealProjectStore.js";
import {useRecipeStore} from "@/stores/RecipeStore.js";
import useIngredientStore from "@/stores/IngredientStore.js";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const mealProjectStore = useMealProjectStore()
const recipeStore = useRecipeStore()
const ingredientStore = useIngredientStore()

const {days} = storeToRefs(mealProjectStore)
const {recipes} = storeToRefs(recipeStore)
const {ingredients, categories} = storeToRefs(ingredientStore)

const usedIngredientList = computed(() => {
  const recipeList = []
  for (let day of days.value) {
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
    usedIngredientList.push({
      quantity: ingredientMap[ingredientID],
      name: ingredient.name,
      unit: ingredient.unit
    })
  }

  return usedIngredientList
})

</script>

<template>
  <h2>Einkaufsliste</h2>
  <div>
    <div v-for="i in usedIngredientList">
      <p>{{i.name}}: {{i.quantity}} {{i.unit}}</p>
    </div>
  </div>
</template>

<style scoped>

</style>