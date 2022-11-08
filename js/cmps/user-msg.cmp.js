import { eventBus } from "../services/event-bus.service.js"


export default {
    template: `
        <section v-if="msg.txt" class="user-msg" :class="msg.type">
            
            <h1>{{msg.txt}} <button @click="msg.txt=''">x</button></h1>

        </section>
    `,
    data() {
        return {
            msg: { txt: '', type: 'success' }
        }
    },
    created() {
        eventBus.on('user-msg', this.showMsg)
    },
    methods: {
        showMsg(payload) {
            this.msg = payload
            setTimeout(() => this.msg.txt = '', this.msg.timeout || 1500)
        }
    },
}