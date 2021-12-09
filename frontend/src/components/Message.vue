<template>
<div>
    <div>
    <p>Ajouter un post</p>
    <form v-on:submit.prevent="checkForm">
    <p v-if="errors.length">
            <b>Merci de corriger les erreurs suivantes:</b>
            <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
            </p>
            <p v-if="success !== ''">{{ success}}</p>
        <div class="form-group">
            <label>Contenu</label>
            <textarea name="content" class="form-control form-control-lg"  v-model="content" placeholder="Contenu"></textarea>            
        </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Ajouter</button>
    </form>
    </div>
    
    <div v-for="message in messages" :key="message.postId">
        <p>{{message.content}}</p>
        <p>Ecrit :{{ message.date | moment("from") }}</p>
        <p>Par : {{message.pseudo}}</p>        
        <hr />
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
                messages: [],
                token: '',
                content: '',
                errors: [],
                success: '',
                userId: ''
            };
        },
    methods: {
        async retrieveMessages() {
            http.get('/post/list',
                {
                headers: {
                    'Authorization': `bearer ${this.token}`
                }
            }).then(response => {  
                this.messages = response.data;
            })
            .catch(e => {  
                console.log(e);  
            });  
        },
        checkForm: function (e) {
                this.errors = [];                
                if (!this.content) {
                    this.errors.push('Contenu requis.');
                }
                
                if (!this.errors.length) {
                    this.addMessage();
                    return true;
                }
                e.preventDefault();
            },

        async addMessage() {
            this.success = '';
            this.errors = '';
            let formDatas = {"content": this.content, "userId": this.userId }

            http.post('/post/create', JSON.stringify(formDatas),
                {
                headers: {
                    'Authorization': `bearer ${this.token}`
                }
                })
            .then(response => {
                 this.success = response.data.message;
                 this.retrieveMessages();
                    
            })
            .catch(e => { 
                if(e.response) {                    
                    this.errors.push(e.response.data.error); 
                }
            });
        }
    },
    mounted: function() {
            let userConnected = localStorage.getItem('user');
            if(!userConnected) {
                window.location.href="/";
            }
            let user = JSON.parse(userConnected);
            
            this.token = user.token;
            this.userId = user.userId;
            console.log(userConnected);
            
            this.retrieveMessages();
        }
    }

</script>