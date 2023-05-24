<template>
    <div class="inputControl">
        <div class="inputWrap">
            <input type="text" placeholder="Search by name...">
        </div>
        <div class="inputIcon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.inputControl {
    display: flex;
    align-items: center;
    border-radius: 10px;
    padding-right: 8px;
}

.inputWrap {
    display: flex;
    background-color: red;
}

.inputIcon {
    display: flex;
    flex: 1;

    svg {
        width: 24px;
        height: 24px;
        color: #909296;
    }
}

input {
    outline: none;
    border: none;
    display: flex;
    padding-left: 8px;
    background-color: #f1f2f8;

    &::placeholder {
        color: #909296;
    }
}
</style>