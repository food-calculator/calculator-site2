<script setup>
import {computed, ref} from "vue";

const {
  selectList,
  customDisplayProperty = "",
  customIdProperty = ""
} = defineProps(["selectList", "customDisplayProperty", "customIdProperty"])

const viewList = computed(() =>
    selectList.map((element, index) => {
      return {
        view: (customDisplayProperty === "") ? element : element[customDisplayProperty],
        id: (customIdProperty === "") ? index : element[customIdProperty]
      }
    })
)

const model = defineModel()
const edit = ref(false)

function select(e) {
  model.value = parseInt(e.target.value)
}

function startEdit() {
  edit.value = true
}

function stopEdit() {
  edit.value = false
}
</script>

<template>
  <span class="listSelectorView" v-if="!edit" @click="startEdit">
    {{ viewList.filter((element) => element.id === model)[0].view }}
  </span>
  <span v-if="edit">
    <select @change="select">
      <option v-for="element in viewList" :value="element.id" :selected="element.id === model">
        {{ element.view }}
      </option>
    </select>
    <button @click="stopEdit">Bestätigen</button>
  </span>
</template>

<style scoped>
button {
  margin-left: 1lh;
}

.listSelectorView {
  cursor: pointer;
  border-radius: 2px;
}

.listSelectorView:hover {
  background: var(--color-background-soft);
}
</style>