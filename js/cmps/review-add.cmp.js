
export default {
    props: ['book'],
    template: `
        <section class="review-add">
            <h2>Add your review</h2>
            <form>
                Full name: <input ref="name" type="text" v-model="name">
                Rate: <select v-model="rate">
                    <option value=""></option>
                    <option value="1">⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                </select>
                Read at: <input type="date" v-model="date">
                Anything else: <textarea rows = "5" v-model="freeTxt"></textarea>
                <button @click.prevent="onSendReview" :disabled="!isValid">Send</button>



            </form>
        </section>
    `,
    data() {
        return {
            name: 'Books Reader',
            rate: 5,
            date: new Date().toLocaleDateString('en-CA'),
            freeTxt: '',

        }
    },
    computed: {
        isValid() {
            return this.name && this.rate && this.date && this.freeTxt
        }

    }, mounted() {
        this.$refs.name.focus()
    },
    methods: {
        onSendReview() {
            const review = {
                name: this.name, rate: this.rate, date: this.date, txt: this.freeTxt
            }
            this.$emit('sendReview', review)
            this.name = 'Books Reader'
            this.rate = 5
            this.date = new Date().toLocaleDateString('en-CA')
            this.freeTxt = ''
        }
    }
}