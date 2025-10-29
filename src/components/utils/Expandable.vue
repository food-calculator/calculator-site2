<script setup>
import {ref} from "vue";

defineProps(["title"])

const show = ref(false)

function toggleContent() {
  show.value = !show.value
}
</script>

<template>
  <div class="expandable">
    <h3 @click="toggleContent">{{ title }}</h3>
    <div v-if="show" class="flexRow">
      <span class="arrowTopLeft">&#8658;</span>
      <div class="expandableContent">
        <slot/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.expandable {
//border-left: 1px solid var(--color-border-hover); //border-radius: 2px 0 0 2px; padding: 3px;
  margin: 3px 0;
  width: max-content;
}

h3 {
  width: max-content;
  padding: 3px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
}

h3:hover {
  background: var(--color-background-soft);
}

.arrowTopLeft {
  font-size: 1.3em;
  margin: 0 3px;
}

.expandableContent {
  padding: 5px;
  border: 1px solid var(--color-border-hover);
  border-radius: 5px;
  width: max-content;
}
</style>