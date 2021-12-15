<template>
<div>
    <div id="messageForm">
        <form v-on:submit.prevent="checkForm" enctype="multipart/form-data">
     <div id="errorMessage">
        <p v-if="errors.length">
            <b>Merci de corriger les erreurs suivantes:</b>
            <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
            </p>
        </div>
        <div class="succesMessage">
            <p v-if="success !== ''">{{ success}}</p>
        </div>
        <div class="form-group">
            <textarea name="content" class="form-control form-control-lg"  v-model="content" placeholder="Taper votre message ici"></textarea>
            
        </div>
         <div id="buttonsForm"> 
            <input type="file" name="imagePost" @change="handleFileUpload( $event )" ref="inputImage" accept="image/x-png,image/gif,image/jpeg" id="postImg" />
            <button type="submit" class="postButton" aria-label="AjouterMessage">Ajouter</button>
        </div>
        </form>
    </div>
    
    <div v-for="message in messages" :key="message.postId">
        <Message v-bind:message="message" />        
       
    </div>
  
</div>
</template>


<style lang="scss">

#messageForm{
    width: 68%;
    margin-top: -210px;
    margin-left: 25%;
     @media screen and (max-width: 900px){
      margin-top: -215px;
  }
   @media screen and (max-width: 550px){
      margin-top: 0px;
      width: 90%;
      margin-left:auto;
      margin-right:auto;
     
  }
}
.form-control-lg{
    font-size: 14px;
    height: 160px;
}
#postImg{
   font-size: 12px;

}
.postButton{

  border-radius: 45px;
  padding: 7px;
  background:rgb(14, 104, 146);
  color: white;
  width: 20%;
  font-size: 14px;
  @media screen and (max-width:810px){
      width: 30%;
  }
  @media screen and (max-width:550px){
      width: 40%;
      margin-top:10px;
  }
}
#buttonsForm{
    display:flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top:5px;
     @media screen and (max-width:550px){
      flex-direction: column;
  }
}
#errorMessage{
    background-color:rgb(236, 142, 142);
    border-radius:20px;
    text-align:left;
}
#errorMessage p{
   margin-left:15px;
   padding-top:10px;
   padding-bottom:5px;
}
.succesMessage{
    background-color:rgb(105, 223, 160);
    border-radius:20px;
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
//Post message
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