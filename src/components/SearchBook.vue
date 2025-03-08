<script setup lang="ts">
import {ref} from 'vue'

const searchQuery = ref<string>('')

const emit = defineEmits(['filter-books'])

function filterBooks(){
    emit('filter-books', searchQuery.value)
}
</script>

<template>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
            <input v-model="searchQuery" v-on:input="filterBooks" type="text" class="form-control" placeholder="Rechercher..." aria-label="Recipient's username" aria-describedby="basic-addon2">
        </div>
</template>

<style scoped>
</style>