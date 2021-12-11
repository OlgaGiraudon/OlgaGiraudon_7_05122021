<template>
<div >
    <div id="mtest">
        <form v-on:submit.prevent="checkForm" enctype="multipart/form-data">
        <p v-if="errors.length">
            <b>Merci de corriger les erreurs suivantes:</b>
            <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
            </p>
            <p v-if="success !== ''">{{ success}}</p>
        <div class="form-group">
            <textarea name="content" class="form-control form-control-lg"  v-model="content" placeholder="Taper votre message ici"></textarea>
            
        </div>
            <input type="file" name="imagePost" @change="handleFileUpload( $event )" ref="inputImage" accept="image/x-png,image/gif,image/jpeg" id="postImg" />
            <button type="submit" class="postButton" >Ajouter</button>
        </form>
    </div>
    
    <div v-for="message in messages" :key="message.postId">
        <Message v-bind:message="message" />        
        <hr />
    </div>
  
</div>
</template>


<style lang="scss">
#mtest{
    width: 65%;
    margin-top: -15%;
    margin-left: 30%;
}
.form-control-lg{
    font-size: 14px;
    height: 130px;
}
#postImg{
   font-size: 14px;
}
.postButton{
  border-radius: 45px;
  padding: 7px;
  background:rgb(14, 104, 146);
  color: white;
  width: 15%;
  font-size: 14px;
}
</style>
 
<script>

    import http from "../api.js";
    import Message from './Message.vue';
    export default {
        name:"messageList",
        components: {
            Message
        },
        props: ['message'],
        data() {
            return {
                messages: [],
                token: '',
                content: '',
                errors: [],
                success: '',
                userId: '',
                file: ''                
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
        handleFileUpload( event ){
            this.file = event.target.files[0];
        },
        
        checkForm: function (e) {
                this.success = '';
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

            const formData = new FormData();
            if(this.file) {
                formData.append('imagePost', this.file, this.file.filename);
            }
            formData.append('content', this.content);
            formData.append('userId', this.userId);

            http.post('/post/create', formData,
                {
                headers: {
                    'Authorization': `bearer ${this.token}`
                }
                })
            .then(response => {
                 this.success = response.data.message;
                 this.file = '';
                 this.content = '';
                 this.$refs.inputImage.value=null;
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

            this.retrieveMessages();
        }
    }

</script>