<template>
<div>
    <div v-for="message in messages" :key="message.postId">
        <p>{{message.content}}</p>
        <p>{{ message.date | moment("from") }}</p>
        <p>{{message.userId}}</p>
    </div>

</div>
</template>


<style lang="scss">

</style>
 
<script>

    import http from "../api.js";
    export default {
        name:"messageList",
        data() {
            return {
                messages: []
            };
        },
    
    created()
    {
        this.retrieveMessages();
    },
    methods: {
        retrieveMessages() {
            http.get('/post/list').then(response => {  
                this.messages = response.data;
            })
            .catch(e => {  
            console.log(e);  
            });  
        }
    }
    }

</script>