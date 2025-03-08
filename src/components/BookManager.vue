<script setup lang="ts">
import BookList from "./BookList.vue";
import AddBookForm from "./AddBookForm.vue";
import SearchBook from "./SearchBook.vue";
import { type Book } from '../scripts/type.ts'
import {ref, computed} from 'vue'
import ModifyBookForm from "./ModifyBookForm.vue";
import BookDetails from "./BookDetails.vue";
import {initialBooks} from "../scripts/initialBooks.ts"
import {OUT_OF_STOCK_ALERT_MESSAGE, WEBSITE_HEADER_IMG_ALT, 
FOOTER_COPYRIGHT, BOOK_TITLE_MAX_LENGTH_IN_FULL_VIEW, BOOK_TITLE_MAX_LENGTH_IN_SHORTEN_VIEW} from '../scripts/constants.ts'

const books = ref<Book[]>([...initialBooks]);

const lastId = ref<number>(books.value.length);

//Généré par chatgpt
const searchQuery = ref<string>('');
const filteredBooks = computed(() => {
  if (!searchQuery.value) return books.value;
  return books.value.filter(book => book.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

function addBook(newBook : Book){
    lastId.value++
    newBook.id = lastId.value
    books.value.push(newBook)
}

function modifyBook(modifiedBook : Book){
    const index = books.value.findIndex(book => book.id === modifiedBook.id);
    books.value[index] = modifiedBook;

    const indexFiltered = filteredBooks.value.findIndex(book => book.id === modifiedBook.id);
    if(indexFiltered !== -1){
        filteredBooks.value[indexFiltered] = modifiedBook;
    }
}

function removeBook(bookId : number) {
    books.value = books.value.filter(book => book.id !== bookId)
}

function getBooksThatAreOutOfStock(): string {
    let booksOutOfStock = ''
    books.value.forEach((book : Book) => {
        if(book.stock === 0){
            booksOutOfStock += '<br> • ' + book.title
        }
    })
    return booksOutOfStock
}

let showAddingForm = ref<boolean>(false);
let showModifyingForm = ref<boolean>(false);
let showBookDetailedView = ref<boolean>(false);

let currentBookToModify = ref<Book | null>(null)
let currentBookToShowDetails = ref<Book | null>(null)
let currentBookToDuplicate = ref<Book | null>(null)

//Généré avec chatgpt
const exportToCSV = () => {
    const headers = ['ID', 'Title', 'Synopsis', 'Author', 'Cover Image', 'Release Date', 'Price', 'Stock'];
    const rows = books.value.map(book => [
        book.id,
        book.title,
        book.synopsis,
        book.author,
        book.coverImage,
        book.releaseDate,
        book.price,
        book.stock
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'books.csv';
    link.click();
};

</script>

<template>
    <header>
        <img class="img-fluid" src="../assets/images/book-banner.jpg" :alt="WEBSITE_HEADER_IMG_ALT">
    </header>
    <main class="container min-vh-100 mt-4">
      <div class="justify-content-center align-items-center">
          <div class="row mb-2">
              <div class="col-md-6">
                  <SearchBook @filter-books="searchQuery = $event"/>
              </div>
              <div class="col-md-3">
                  <button class="btn btn-success w-100" @click="showAddingForm = true, showModifyingForm = false"><i class="bi bi-plus-lg"></i> Ajouter</button>
              </div>
              <div class="col-md-3">
                  <button class="btn btn-secondary w-100 " @click="exportToCSV"><i class="bi bi-arrow-bar-up"></i> Exporter en csv</button>
              </div>
          </div>
          <div class="mb-2">
              <div v-if="showAddingForm">
                  <AddBookForm 
                    :key="currentBookToDuplicate? currentBookToDuplicate.id : 0"
                    :bookToDuplicate="currentBookToDuplicate" 
                    @add-book="addBook($event), currentBookToDuplicate = null" 
                    @close-form="showAddingForm = false, currentBookToDuplicate = null"
                  />
              </div>
              <div v-if="showModifyingForm, currentBookToModify !== null">
                  <ModifyBookForm 
                  :key="currentBookToModify.id"
                  :book="currentBookToModify" 
                  @modify-book="modifyBook($event)" 
                  @close-form="showModifyingForm = false, currentBookToModify = null"
                  />
              </div>
              <div class="row">
                  <div :class="showBookDetailedView ? 'col-md-8' : 'col-md-12'">
                      <BookList 
                      :books="filteredBooks" 
                      :maxLengthTitle="showBookDetailedView ? BOOK_TITLE_MAX_LENGTH_IN_SHORTEN_VIEW : BOOK_TITLE_MAX_LENGTH_IN_FULL_VIEW"
                      @open-modify-form="currentBookToModify = $event, showModifyingForm = true, showAddingForm = false"
                      @remove-book="removeBook($event)"
                      @show-details="currentBookToShowDetails = $event, showBookDetailedView = true"
                      @duplicate-book="currentBookToDuplicate = $event, showModifyingForm = false, showAddingForm = true"
                      />
                  </div>
                  <div v-if="showBookDetailedView, currentBookToShowDetails !== null" class="col-md-4">
                      <BookDetails :book="currentBookToShowDetails" @close-window="showBookDetailedView = false, currentBookToShowDetails = null"/>
                  </div>
              </div>
          </div>
      </div>
    </main>
    <div v-if="getBooksThatAreOutOfStock() !== ''" class="alert alert-danger text-center alert-dismissible fade show position-fixed top-0 start-0 w-100 z-index-1030" role="alert">
        <p v-html="OUT_OF_STOCK_ALERT_MESSAGE + getBooksThatAreOutOfStock()"></p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
    </div>
    <footer class="text-center py-3">
        <div class="container">
            <p>&copy;{{FOOTER_COPYRIGHT}}</p>
        </div>
    </footer>
</template>

<style scoped>
</style>