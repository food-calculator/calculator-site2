import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useMealProjectStore = defineStore('MealProject', () => {
    const projects = ref([
        {
            title: "Essensplan #1",
            mealNames: ["Mittagessen", "Nachtisch", "Abendessen"],
            dateStart: "2025-10-24",
            dateEnd: "2025-10-25",
            numberOfPersons: 30,
            location: "Hartha",
            days: [
                {
                    title: "Montag, 2025-10-24",
                    meals: [
                        {"recipe": 0, "numberOfPersons": 30},
                        {"recipe": 2, "numberOfPersons": 30},
                        {"recipe": 1, "numberOfPersons": 30}
                    ],
                },
            ]
        }
    ])

    return {
        projects
    }
}, {persist: true})
