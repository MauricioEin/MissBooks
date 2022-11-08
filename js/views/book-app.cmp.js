import { bookService } from '../services/book-service.js'

import bookFilter from '../cmps/book-filter.cmp.js'
// import bookEdit from './book-edit.cmp.js'
import bookList from '../cmps/book-list.cmp.js'


export default {
    template: `
        <section class="book-app">
            <book-filter v-if="!selectedBook" @filtered="setFilter"/>
            <book-list v-if="books" :books="booksToShow"/>
        </section>
    `,
    data() {
        return {
            books: null,
            filterBy: null,
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            const regexTitle = new RegExp(this.filterBy.title, 'i')
            const isInPriceRange = book => (book.listPrice.amount >= this.filterBy.minPrice && book.listPrice.amount <= this.filterBy.maxPrice)
            return this.books.filter(book => regexTitle.test(book.title)).filter(isInPriceRange)
        }

    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        },

    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    components: {
        bookFilter,
        // bookEdit,
        bookList,
    }
}