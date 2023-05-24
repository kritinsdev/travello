<template>
    <div class="places">
        <PlaceCard />
        <div class="place" v-for="place in places" :key="place.id">
            <h3>{{ place.name }}</h3>
        </div>
    </div>
</template>
  
<script setup>
import { onMounted, ref, computed } from 'vue';
// ... other imports

onMounted(async () => {
    createPlaceCards();
});


let places = ref([]);

const createPlaceCards = async () => {
    try {
        const response = await fetch("data.json");
        const data = await response.json();

        // Calculate distances and add them to the place objects
        places.value = await Promise.all(
            data.map(async (item) => {
                return { ...item };
            })
        );

        // places.value.sort((a, b) => a.distance - b.distance);

    } catch (error) {
        console.error("Error loading JSON data:", error);
    }
};

</script>
  
<style scoped>
.places {
    overflow-y: scroll;
}
</style>