import reviewPreview from "./review-preview.cmp.js"

export default {
    props: ['book'],
    template: `
        <section class="book-reviews">
            <h2>Reviews on this book:</h2>
            <ul v-if="book.reviews && book.reviews.length" class="review-list">
                <li v-for="review in book.reviews">
                    <review-preview :review="review"/>
                    <button title="delete review" @click="onDelete(review.id)">x</button>
                </li>
            </ul>
            <p v-else>Be the first to post a review!</p>
        </section>
    `,
    methods: {
        onDelete(reviewId) {
            this.$emit('delete', reviewId)
        }
    },
    components: {
        reviewPreview,
    }
}