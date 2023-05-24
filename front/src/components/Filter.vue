<template>
    <div class="filters">
        <FilterButton name="Pizza" />
        <FilterButton name="Sushi" />
        <FilterButton name="Grill" />
        <FilterButton name="BBQ" />
        <FilterButton name="Pizza" />
        <FilterButton name="Sushi" />
    </div>
</template>

<script setup>
import FilterButton from './Parts/FilterButton.vue';

</script>

<style lang="scss" scoped>
.filters {
    display: flex;
    gap: 16px;
    padding: 16px;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
}
</style>