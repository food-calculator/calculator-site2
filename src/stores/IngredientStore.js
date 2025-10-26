import {defineStore} from "pinia";
import {ref} from "vue";

const useIngredientStore = defineStore('IngredientStore', () => {
    const ingredients = ref([
        {
            id: 0,
            name: "Spaghetti",
            category: 0,
            unit: "kg",
            kcalPerUnit: 1450
        },
        {
            id: 1,
            name: "Tomaten",
            category: 1,
            unit: "kg",
            kcalPerUnit: 170
        }
    ])

    const categories = ref({
        0: "Trockenwaren",
        1: "Gemüse"
    })

    return {ingredients, categories}
})

export default useIngredientStore;