import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useMealProjectStore = defineStore('MealProject', () => {
    const days = ref([
        {
            title: "Montag, 2025-10-24",
            meals: [
                {name: 0, recipe: 0, numberOfPersons: 42},
                {name: 1, recipe: 3, numberOfPersons: 42},
                {name: 2, recipe: 6, numberOfPersons: 42}
            ],
        },
        {
            title: "Dienstag, 2025-10-24",
            meals: [
                {name: 0, recipe: 1, numberOfPersons: 42},
                {name: 1, recipe: 2, numberOfPersons: 42},
                {name: 2, recipe: 7, numberOfPersons: 42}
            ],
        }
    ])

    const mealNames = ref([
        "Mittagessen",
        "Nachtisch",
        "Vesper"
    ])

    const dateStart = ref("2025-10-24")
    const dateEnd = ref("2025-10-25")
    const numberOfPersons = ref(42)
    const location = ref("Hartha")

    return {
        days, mealNames, dateStart, dateEnd, numberOfPersons, location
    }
})
