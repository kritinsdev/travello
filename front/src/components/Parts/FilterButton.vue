<template>
    <div class="filterButton">
        {{ name }}
    </div>
</template>

<script setup>
defineProps({
    name: String,
})
</script>

<style lang="scss" scoped>
.filterButton {
    background-color: #f1f2f8;
    font-size: 14px;
    border-radius: 20px;
    padding: 4px 16px;

    &:hover {
        cursor: pointer;
        background-color: #dcdde3;
    }
}
</style>