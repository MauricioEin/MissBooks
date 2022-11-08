export default {
    props: ['book'],
    template: `
        <section class="book-preview">
            <div>
            <h2>{{ book.title }}</h2>
            <h4>{{ formattedPrice}}</h4>
</div>
            <img :src="book.thumbnail"/>
        </section>
    `,
    computed: {
        formattedPrice() {
            return new Intl.NumberFormat(this.book.language, { style: 'currency', currency: this.book.listPrice.currencyCode }).format(this.book.listPrice.amount)
        }
    },
    methods:{

    }
}