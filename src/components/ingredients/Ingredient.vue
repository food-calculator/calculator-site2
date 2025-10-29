<script setup>
import useIngredientStore from "@/stores/IngredientStore.js";
import InteractiveValue from "@/components/utils/InteractiveValue.vue";
import ListSelector from "@/components/utils/ListSelector.vue";
import Expandable from "@/components/utils/Expandable.vue";

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
    <Expandable :title="ingredient.name">
      <p>
        Name:
        <InteractiveValue v-model="ingredient.name" type="text"/>
      </p>
      <p>
        Einheit:
        <InteractiveValue v-model="ingredient.unit" type="text"/>
      </p>
      <p>
        kcal pro 1 {{ ingredient.unit }}:
        <InteractiveValue v-model="ingredient.kcalPerUnit" type="number"/>
      </p>
      <p>
        Kategorie:
        <ListSelector v-model="ingredient.category" :selectList="ingredientStore.categories"/>
      </p>
      <button @click="deleteSelf">Löschen</button>
    </Expandable>
  </div>
</template>

<style scoped>

</style>