import {defineStore} from "pinia";
import {ref} from "vue";

export const useRecipeStore = defineStore("Recipes", () => {
    const recipes = ref([
        "Nudeln",
        "Ofenkartoffeln",
        "Tomatensuppe",
        "Vanillepudding",
        "Schokopudding",
        "Panna Cotta",
        "Schokokuchen",
        "Kekse",
        "Waffeln"
    ])

    return {recipes}
})