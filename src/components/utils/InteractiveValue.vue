<script setup>
import {nextTick, ref, useTemplateRef} from "vue";

defineProps(["type"])

const edit = ref(false)
const content = defineModel()
const input = useTemplateRef("input")

function show() {
  edit.value = true
  nextTick(() => {
    input.value.focus()
  })
}

function hide() {
  edit.value = false
}

function keyUp(e) {
  if (e.key === 'Enter') hide()
}

</script>

<template>
  <span v-if="!edit" @click="show">{{ content }}</span>
  <input ref="input" v-if="edit" :type="type" v-model="content"
         @focusout="hide" @keyup="keyUp"/>
</template>

<style scoped>
span {
  cursor: pointer;
  padding: 2px;
  border-radius: 2px;
}

span:hover {
  background: var(--color-background-soft);
}
</style>