import { bookService } from "../services/book-service.js"

export default {
    props: ['review'],
    template: `
    <article class="review-preview">
        <p>"{{review.txt}}"</p>
        <p>{{stars}}</p>
        <p>by {{review.name}}</p>
        <p>{{review.date}}</p>
    </article>
    `,
    computed: {
        stars() {
            return '⭐'.repeat(this.review.rate)
        }

    }
}