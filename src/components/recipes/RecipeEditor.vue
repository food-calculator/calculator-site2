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

function dragOver(event) {
  event.preventDefault()
}

function dragEnter(event) {
  event.target.classList.add("hover")
}

function dragLeave(event) {
  event.target.classList.remove("hover")
}

function drop(event) {
  event.preventDefault()
  deHover()
  const source = parseInt(event.dataTransfer.getData("number"))
  const target = parseInt(event.target.getAttribute("data-drop-id"))
  console.log(`from: ${source} to ${target}`)
  const element = recipe.value.ingredients[source]
  recipe.value.ingredients.splice(source, 1)
  if (target <= source)
    recipe.value.ingredients.splice(target, 0, element)
  else
    recipe.value.ingredients.splice(target - 1, 0, element)
}

function deHover() {
  for (const hover of document.getElementsByClassName("hover")) {
    hover.classList.remove("hover")
  }
}

function dragStart(event, number) {
  event.dataTransfer.setData("number", number)
}
</script>

<template>
  <div class="recipeEditor">
    <h3>{{ recipe.name }}</h3>
    <p>
      Name:
      <InteractiveValue v-model="recipe.name" type="text"/>
    </p>
    <div class="recipeContentContainer">
      <div class="ingredientList">
        <p>Zutaten pro 10 Personen</p>
        <div v-for="(ingredient, i) in usedIngredients">
          <div class="drop" @dragenter="dragEnter" @dragleave="dragLeave" @dragover="dragOver" @drop="drop"
               :data-drop-id="i"></div>
          <div class="ingredientContainer">
            <span class="dragIngredient" draggable="true"
                  @dragstart="event => dragStart(event, i)" @dragend="deHover">▒</span>
            <Expandable :title="ingredient.name" :big-title="false">
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
          </div>
        </div>
        <div class="drop" @dragenter="dragEnter" @dragleave="dragLeave" @dragover="dragOver" @drop="drop"
             :data-drop-id="usedIngredients.length"></div>
        <button @click="addIngredient">Zutat hinzufügen</button>
      </div>
      <hr/>
      <div class="recipeDescription">
        <p>Beschreibung</p>
        <div style="padding: 3px; width: max-content">
          <interactive-value v-model="recipe.description" type="textarea" empty-value="Beschreibung einfügen..."/>
        </div>
      </div>
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

.recipeContentContainer {
  display: flex;
  flex-direction: row;
  gap: 30px;
  padding: 15px;
}

.ingredientContainer {
  display: flex;
  flex-direction: row;
  gap: 10px
}

.dragIngredient {
  cursor: pointer;
}

.drop {
  height: 1em;
}

.hover {
  background: rgba(0, 255, 0, 0.2);
}
</style>