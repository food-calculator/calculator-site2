<script setup>
import {computed, nextTick, ref, useTemplateRef} from "vue";

const {emptyValue = "", type} = defineProps(["type", "emptyValue"])

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
  if (e.key === "Escape") hide()
  if (type === "textarea") return
  if (e.key === 'Enter') hide()
}

const renderValue = computed(() => {
  if (content.value !== "" && content.value != null) return content
  else return emptyValue
})

</script>

<template>
  <pre v-if="!edit && type==='textarea'" @click="show">{{ renderValue }}</pre>
  <span v-if="!edit && type!=='textarea'" @click="show">{{ renderValue }}</span>
  <input ref="input" v-if="edit && type!=='textarea'" :type="type" v-model="content"
         @focusout="hide" @keyup="keyUp"/>
  <textarea ref="input" v-if="edit && type==='textarea'" v-model="content"
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