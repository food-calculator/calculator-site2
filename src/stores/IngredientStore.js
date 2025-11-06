import {defineStore} from "pinia";
import {ref} from "vue";

const useIngredientStore = defineStore('IngredientStore', () => {
    const ingredients = ref(
        [
            {"id": 0, "name": "Spaghetti", "category": 0, "unit": "kg", "kcalPerUnit": 1450},
            {"id": 1, "name": "Tomaten", "category": 1, "unit": "kg", "kcalPerUnit": 170},
            {"id": 2, "name": "Käse", "category": 2, "unit": "kg", "kcalPerUnit": 0},
            {"id": 3, "name": "Milch", "category": 2, "unit": "L", "kcalPerUnit": 0},
            {"id": 4, "name": "Stärke", "category": 3, "unit": "kg", "kcalPerUnit": 0},
            {"id": 5, "name": "Zucker", "category": 3, "unit": "kg", "kcalPerUnit": 0},
            {"id": 6, "name": "Vanillazucker", "category": 3, "unit": "Päckchen", "kcalPerUnit": 0}
        ])

    const categories = ref([
        {"id": 0, "name": "Trockenwaren"},
        {"id": 1, "name": "Gemüse"},
        {"id": 2, "name": "Milchprodukte"},
        {"id": 3, "name": "Backwaren"}
    ])

    return {ingredients, categories}
}, {persist: true})

export default useIngredientStore;