export default {
    props: ['books'],
    template: `
        <ul class="google-book-list">
            <li v-for="book in books" :key="book.id">
                <h1>{{book.volumeInfo.title}} <button @click="onSelect(book)">+</button></h1>
            </li>
        </ul>
    `,
    methods: {
        onSelect(book) {
            this.$emit('selected', book)
        }
    }
}