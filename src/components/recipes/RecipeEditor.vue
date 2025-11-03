<script setup>
import {useRecipeStore} from "@/stores/RecipeStore.js";
import {computed} from "vue";
import {storeToRefs} from "pinia";
import InteractiveValue from "@/components/utils/InteractiveValue.vue";
import useIngredientStore from "@/stores/IngredientStore.js";
import Expandable from "@/components/utils/Expandable.vue";
import ListSelector from "@/components/utils/ListSelector.vue";

const {recipeId} = defineProps(["recipeId"])

const recipeStore = useRecipeStore()
const ingredientStore = useIngredientStore()

const {recipes} = storeToRefs(recipeStore)
const {ingredients} = storeToRefs(ingredientStore)

const recipe = computed(() =>
    recipes.value.find(r => r.id === recipeId)
)

const usedIngredients = computed(() =>
    recipe.value.ingredients.map((recipeIngredient, i) => {
      const correspondingIngredient = ingredients.value.find(j => j.id === recipeIngredient.id)
      return {
        id: i,
        name: correspondingIngredient.name,
        unit: correspondingIngredient.unit,
        kcalPerUnit: correspondingIngredient.kcalPerUnit,
        quantity: recipeIngredient.quantity
      }
    })
)

function addIngredient() {
  recipe.value.ingredients.push({id: 0, quantity: 1})
}

function removeIngredient(id) {
  recipe.value.ingredients.splice(id, 1)
}
</script>

<template>
  <div class="recipeEditor">
    <h3>{{ recipe.name }}</h3>
    <p>
      Name:
      <InteractiveValue v-model="recipe.name" type="text"/>
    </p>
    <div class="ingredientContainer">
      <p>Zutaten pro 10 Personen:</p>
      <Expandable v-for="ingredient in usedIngredients" :title="ingredient.name" :big-title="false">
        <p>
          Zutat:
          <list-selector v-model="recipe.ingredients[ingredient.id].id" :select-list="ingredients"
                         custom-id-property="id" custom-display-property="name"/>
        </p>
        <p>Menge:
          <interactive-value v-model="recipe.ingredients[ingredient.id].quantity" type="number"/>
          {{ ingredient.unit }}
        </p>
        <p>Brennwert: {{ ingredient.kcalPerUnit }} kcalPerUnit</p>
        <button @click="() => removeIngredient(ingredient.id)">Löschen</button>
      </Expandable>
      <button @click="addIngredient">Zutat hinzufügen</button>
    </div>
  </div>
</template>

<style scoped>
.recipeEditor {
  border: 1px solid var(--color-border);
  border-radius: 5px;
  width: max-content;
  padding: 5px;
  margin: 10px 0;
}

.ingredientContainer {
  margin-top: 15px;
}
</style>