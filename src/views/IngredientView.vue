<script setup>
import Ingredient from "@/components/ingredients/Ingredient.vue";
import useIngredientStore from "@/stores/IngredientStore.js";
import InteractiveValue from "@/components/utils/InteractiveValue.vue";

const ingredientStore = useIngredientStore()

const ingredients = ingredientStore.ingredients

function addCategory() {
  const keys = Object.keys(ingredientStore.categories)
  const max = Math.max(...keys.map(key => parseInt(key)))
  ingredientStore.categories[max + 1] = "Neue Kategorie"
}

function addIngredient() {
  const ingredients = ingredientStore.ingredients
  const max = Math.max(...ingredients.map(ingredient => ingredient.id))
  ingredients.push({
    id: max + 1,
    name: "Neue Zutat",
    category: 0,
    unit: "kg",
    kcalPerUnit: 0
  })
}

function removeCategory(id) {
  delete ingredientStore.categories[id]
}
</script>

<template>
  <div>
    <div id="ingredientAndCategoryContainer">
      <div>
        <h2>Zutaten</h2>
        <Ingredient v-for="ingredient in ingredients" :ingredient="ingredient"/>
        <button @click="addIngredient">Neue Zutat</button>
      </div>
      <div id="categoryListContainer">
        <div class="categoryList" v-for="i in Object.keys(ingredientStore.categories)">
          <InteractiveValue v-model="ingredientStore.categories[i]" type="text"/>
          <button class="deleteButton" @click="() => removeCategory(i)">Löschen</button>
        </div>
        <button @click="addCategory">Neue Kategorie</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#ingredientAndCategoryContainer {
  display: flex;
  justify-content: space-between;
}

.deleteButton {
  padding: 1px;
  height: max-content;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.categoryList {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 11px;
}

#categoryListContainer {
  display: flex;
  flex-direction: column;
}
</style>