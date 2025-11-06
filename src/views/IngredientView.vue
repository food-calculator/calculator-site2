<script setup>
import Ingredient from "@/components/ingredients/Ingredient.vue";
import useIngredientStore from "@/stores/IngredientStore.js";
import InteractiveValue from "@/components/utils/InteractiveValue.vue";

const ingredientStore = useIngredientStore()

const ingredients = ingredientStore.ingredients

function addCategory() {
  const max = Math.max(...ingredientStore.categories.map(c => parseInt(c.id)))
  ingredientStore.categories.push({id: max + 1, name: "Neue Kategorie"})
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
    <h2>Zutaten</h2>
    <div class="flexRow spaceBetween">
      <div>
        <Ingredient v-for="ingredient in ingredients" :ingredient="ingredient"/>
        <button @click="addIngredient">Neue Zutat</button>
      </div>
      <div id="categoryListContainer">
        <div class="categoryList" v-for="i in Object.keys(ingredientStore.categories)">
          <InteractiveValue v-model="ingredientStore.categories[i].name" type="text" empty-value="Kategoriename angeben!"/>
          <button class="deleteButton" @click="() => removeCategory(i)">Löschen</button>
        </div>
        <button @click="addCategory">Neue Kategorie</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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