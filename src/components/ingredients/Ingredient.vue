<script setup>
import useIngredientStore from "@/stores/IngredientStore.js";
import InteractiveValue from "@/components/utils/InteractiveValue.vue";
import ListSelector from "@/components/utils/ListSelector.vue";

const props = defineProps(["ingredient"])
const ingredientStore = useIngredientStore()

function deleteSelf() {
  for (const detailsElement of document.getElementsByClassName("ingredientDetails")) {
    detailsElement.open = false
  }
  for (const [i, ingredient] of ingredientStore.ingredients.entries()) {
    if (ingredient.id === props.ingredient.id) {
      ingredientStore.ingredients.splice(i, 1)
      break
    }
  }
}

function onToggle(e) {
  for (const detailsElement of document.getElementsByClassName("ingredientDetails")) {
    if (!e.target.open) return
    detailsElement.open = detailsElement === e.target
  }
}
</script>

<template>
  <div>
    <details class="ingredientDetails" @toggle="onToggle">
      <summary>Name:
        <InteractiveValue v-model="ingredient.name" type="text"/>
      </summary>
      <div class="ingredientDetail">
        <p>Einheit:
          <InteractiveValue v-model="ingredient.unit" type="text"/>
        </p>
        <p>kcal pro 1 {{ ingredient.unit }}:
          <InteractiveValue v-model="ingredient.kcalPerUnit" type="number"/>
        </p>
        <p>Kategorie:
          <ListSelector v-model="ingredient.category" :selectList="ingredientStore.categories"/>
        </p>
        <button @click="deleteSelf">Löschen</button>
      </div>
    </details>
  </div>
</template>

<style scoped>
.ingredientDetail {
  border: 1px solid black;
  border-radius: 10px;
  padding: 4px 8px;
  margin: 5px 0 10px 10px;
  width: max-content;
}
</style>