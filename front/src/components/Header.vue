<template>
    <div class="header">
        <div class="logo">EATER</div>
        <SearchBar />
    </div>
</template>

<script setup>
import SearchBar from './Parts/SearchBar.vue';
</script>

<style lang="scss" scoped>
.header {
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    background-color: #f1f2f8;
}

.logo {
    font-weight: bold;
    font-size: 28px;
}
</style>