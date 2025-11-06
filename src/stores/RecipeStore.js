import {defineStore} from "pinia";
import {ref} from "vue";

export const useRecipeStore = defineStore("Recipes", () => {
    const recipes = ref([
        {
            "id": 0,
            "name": "Nudeln",
            "ingredients": [{"id": 0, "quantity": 1.5}, {"id": 1, "quantity": 1.2}],
            "description": ""
        }, {
            "id": 1,
            "name": "Überbackene Tomaten",
            "ingredients": [{"id": 1, "quantity": 4.5}, {"id": 2, "quantity": 0.75}],
            "description": ""
        }, {
            "id": 2,
            "name": "Pudding",
            "ingredients": [{"id": 3, "quantity": 1}, {"id": 4, "quantity": 0.1}, {"id": 5, "quantity": 0.1}, {"id": 6, "quantity": 1}],
            "description": ""
        }
    ])

    return {recipes}
}, {persist: true})