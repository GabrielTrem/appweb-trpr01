<script setup lang="ts">
import BookItem from "./BookItem.vue";

let bookTemplate = {
    id : 1,
    name : "Kaiju No. 8, Vol. 1",
    synopsis : "With the highest kaiju-emergence rates in the world, Japan is no stranger to attack by deadly monsters. Enter the Japan Defense Force, a military organization tasked with the neutralization of kaiju. Kafka Hibino, a kaiju-corpse cleanup man, has always dreamed of joining the force. But when he gets another shot at achieving his childhood dream, he undergoes an unexpected transformation. How can he fight kaiju now that he’s become one himself?!",
    author : "Naoya Matsumoto",
    coverImage : "https://m.media-amazon.com/images/I/812qiXhyN+L._SL1500_.jpg",
    releaseDate : "07/12/2021",
    price : 15.99,
    stock : 100

}
</script>
<template>
    <div>
        <ul class="list-group">
            <BookItem :book="bookTemplate"/>
        </ul>
    </div>
</template>

<style scoped>
</style>