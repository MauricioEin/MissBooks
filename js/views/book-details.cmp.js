import longText from '../cmps/long-text.cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js'
import bookReviews from '../cmps/book-reviews.cmp.js'

import { bookService } from "../services/book-service.js"
import { eventBus, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export default {
    template: `
    <section class="book-details">
        <div class="book-details-container">
        <img :src="book.thumbnail"/>
        <div clas="book-info">
            <button class="close-details-btn">
                <router-link to="/book">x</router-link>
            </button>

            <h2 v-if="book.listPrice.isOnSale">🌟SALE!🌟</h2>
            <h5 :class="styleClass">{{formattedPrice}}</h5>
            <h1>{{book.title}}</h1>
            <h3>{{book.subtitle}}</h3>
            <h3 v-for="author in book.authors">{{author}}</h3>
            <h4>{{formattedYear}}</h4>
            
            <p v-if="!isLongText">{{book.description.substring(0,99)}}
                <span v-if="book.description.length>100">... 
                    <a href="#" @click.prevent="isLongText=true">more</a></span>
            </p>
            <long-text v-else :txt="book.description" @lessTxt="isLongText=false"/>
            <h5>{{formattedLength}}</h5>
            <ul class="categories">
                <li v-for="category in book.categories">{{category}}</li>
            </ul>
            <div class="book-links">
                <router-link v-if="prevBookId" :to="'/book/' + prevBookId">Previous book</router-link>
                <p v-else></p>
                <router-link v-if="nextBookId" :to="'/book/' + nextBookId">Next book</router-link>
            </div>
        </div>
        <review-add :book="book" @sendReview="sendReview"/>
        </div>
    </section>
    <book-reviews @delete="deleteReview" :book="book"/>
    `,
    data() {
        return {
            isLongText: false,
            book: null,
            prevBookId: null,
            nextBookId: null,
        }
    },
    created() {
        this.loadBook()
    },
    computed: {
        bookId() {
            const id = this.$route.params.id || this.book.id
            return id
        },
        formattedLength() {
            const pages = this.book.pageCount
            if (pages > 500) return pages + ' pages - Long reading'
            if (pages > 200) return pages + ' pages - Decent reading'
            if (pages < 100) return pages + ' pages - Light reading'
            return pages + ' pages'
        },
        formattedYear() {
            const publishYear = this.book.publishedDate
            const currYear = new Date().getFullYear()
            const bookAge = currYear - publishYear
            if (bookAge > 10) return publishYear + ' - Veteran book'
            if (bookAge < 1) return publishYear + ' - New book'
            return publishYear
        },
        styleClass() {
            const price = this.book.listPrice.amount
            return { red: price > 150, green: price < 20 }
        },
        formattedPrice() {
            return new Intl.NumberFormat(this.book.language, { style: 'currency', currency: this.book.listPrice.currencyCode }).format(this.book.listPrice.amount)
        },
    },
    methods: {
        loadBook() {
            bookService.get(this.bookId)
                .then(book => {
                    this.book = book
                    bookService.getPrevNextIds(book.id)
                        .then(ids => {
                            console.log('nbrIds:', ids)
                            this.prevBookId = ids.prev
                            this.nextBookId = ids.next
                        })
                })
                .catch(err => showErrorMsg('Cannot load book'))

        },
        sendReview(review) {
            bookService.addReview(this.book, review)
                .then(() => {
                    showSuccessMsg(`review added`)
                })
                .catch(err => {
                    console.log('OOps:', err)
                    showErrorMsg(`Cannot add review`)
                })

        },
        deleteReview(reviewId) {
            bookService.deleteReview(this.book, reviewId)
                .then(() => {
                    showSuccessMsg(`review deleted`)
                })
                .catch(err => {
                    console.log('OOps:', err)
                    showErrorMsg(`Cannot delete review`)
                })


        }
    },
    mounted() {
        this.isLongText = false
    },
    components: {
        longText,
        reviewAdd,
        bookReviews
    },
    watch: {
        bookId() {
            this.loadBook()
        }
    }
}