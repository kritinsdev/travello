<template>
    <div class="appLayout">
        <slot></slot>

    </div>
</template>

<script setup>

</script>

<style scoped>
.appLayout {
    width: 90%;
    height: 90%;
    background-color: white;
    border-radius: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    overflow: hidden;
}
</style>