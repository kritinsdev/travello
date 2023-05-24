<template>
  <AppLayout>
    <Header />
    <Filter />
    <MainContainer>
      <Places />
      <PlacesMap />
    </MainContainer>
  </AppLayout>
</template>

<script setup>
import AppLayout from './AppLayout.vue';
import Header from './components/Header.vue';
import Filter from './components/Filter.vue';
import MainContainer from './components/MainContainer.vue';
import Places from './components/Places.vue';
import PlacesMap from './components/PlacesMap.vue';
</script>

<style>
#app {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

body {
  background-color: #cacfdb;
}
</style>