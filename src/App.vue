<script setup>
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <header>
    <h1>Essensplanner</h1>
    <nav>
      <div>
        <RouterLink to="/">Übersicht</RouterLink>
        <a href="https://github.com/food-calculator">Projekt auf Github</a>
      </div>
      <div>
        <RouterLink to="/ingredients">Zutaten</RouterLink>
        <RouterLink to="/recipes">Rezepte</RouterLink>
        <RouterLink to="/projects">Projekte</RouterLink>
      </div>
    </nav>
  </header>
  <RouterView/>
</template>

<style scoped>
header {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
}

h1 {
  text-align: center;
}

nav div {
  width: max-content;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

nav div a {
  margin: 5px;
  padding: 3px;
}

nav div a:not(:last-child):after {
  content: "|";
  margin-left: 5px;
  margin-right: 5px;
  position: absolute;
}
</style>
