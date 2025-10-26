<script setup>
import {ref} from "vue";

const props = defineProps(["selectList"])
const model = defineModel()
const edit = ref(false)

function select(e) {
  model.value = e.target.value
}

function startEdit() {
  edit.value = true
}

function stopEdit() {
  edit.value = false
}
</script>

<template>
  <span v-if="!edit" @click="startEdit">
    {{ selectList[model] }}
  </span>
  <span v-if="edit">
    <select @change="select">
      <option v-for="index in Object.keys(selectList)" :value="index" :selected="index === model.toString()">
        {{ selectList[index] }}
      </option>
    </select>
    <button @click="stopEdit">Bestätigen</button>
  </span>
</template>

<style scoped>
button {
  margin-left: 1lh;
}
</style>