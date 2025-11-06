import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useMealProjectStore = defineStore('MealProject', () => {
    const days = ref([
        {
            title: "Montag, 2025-10-24",
            meals: [
                {"recipe": 0, "numberOfPersons": 30},
                {"recipe": 2, "numberOfPersons": 30},
                {"recipe": 1, "numberOfPersons": 30}
            ],
        },
    ])

    const mealNames = ref(["Mittagessen", "Nachtisch", "Abendessen"])

    const dateStart = ref("2025-10-24")
    const dateEnd = ref("2025-10-25")
    const numberOfPersons = ref(42)
    const location = ref("Hartha")

    return {
        days, mealNames, dateStart, dateEnd, numberOfPersons, location
    }
}, {persist: true})
