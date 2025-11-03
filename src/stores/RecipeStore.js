import {defineStore} from "pinia";
import {ref} from "vue";

export const useRecipeStore = defineStore("Recipes", () => {
    const recipes = ref([
        {
            id: 0,
            name: "Nudeln",
            ingredients: [
                {id: 0, quantity: 1.5},
                {id: 1, quantity: 1.2}
            ]
        },
    ])

    return {recipes}
})