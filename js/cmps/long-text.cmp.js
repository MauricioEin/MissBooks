export default {
    props: ['txt'],
    template: `
    <p>{{txt}} <a href="#" @click.prevent="this.$emit('lessTxt')"> less</a></p>
    `
}