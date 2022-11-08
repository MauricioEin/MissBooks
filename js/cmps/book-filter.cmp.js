export default {
    template: `
        <section class="book-filter">
            <input 
                @input="filter"
                v-model="filterBy.title" 
                type="text" 
                placeholder="Search by title">
                &nbsp;&nbsp;&nbsp;
            <span> from price:&nbsp;</span>
            <input 
                @input="filter"
                v-model="filterBy.minPrice" 
                type="number"
                min="0" 
                placeholder="0">&nbsp;&nbsp;&nbsp;
            <span> to price:&nbsp;</span>
            <input 
                @input="filter"
                v-model="filterBy.maxPrice" 
                type="number" 
                :min="filterBy.minPrice"
                :placeholder="filterBy.minPrice">

        </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                minPrice: 0,
                maxPrice: Infinity,

            }
        }
    },
    methods: {
        filter() {
            this.$emit('filtered', this.filterBy)
        }
    }
}