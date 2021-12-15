<template>
    <div class="registration_div">    
        <form v-on:submit.prevent="checkForm">
            <h3>Inscription</h3>
        <div id="errorMessage">
            <p v-if="errors.length">
            <b>Merci de corriger les erreurs suivantes:</b>
            <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
            </p>
        </div>
        <div class="successMessage">
            <p v-if="success !== ''">{{ success}}</p>
        </div>
            <div class="form-group">
                <label>Pseudo</label>
                <input type="text" class="form-control form-control-lg" v-model="pseudo"  placeholder="Pseudo"/>
            </div>
 
            <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control form-control-lg"  v-model="email"  placeholder="Email" />
            </div>
            <div class="form-group">
                <label>Avatar</label><br>
                <input type="file" name="imagePost" id="imagePost" @change="handleFileUpload( $event )" ref="inputImage" accept="image/x-png,image/gif,image/jpeg" />
            </div>

 
            <div class="form-group">
                <label>Mot de passe</label>
                <input type="password" class="form-control form-control-lg"  v-model="password" placeholder="Mot de passe" />
            </div>
 
            <button type="submit" >Enregistrer</button>
 
            <p class="connection text-right">
                Déjà inscrit 
                <router-link :to="{name: 'login'}">Se connecter</router-link>
            </p>
        </form>
    </div>
</template>

<style lang="scss">
.registration_div {
    width:40%;
    margin-left:auto;
    margin-right: auto;
    @media screen and (max-width:810px){
         width:70%;
    }
     @media screen and(max-width:410px){
         width:90%;
    }
}
#imagePost{
     @media screen and(max-width:410px){
         font-size:12px;
    }
   
}
button{
    background-color: rgb(14, 104, 146);
    color: white;
    border-radius:20px;
    width: 30%;
    min-width:120px;
    height: 40px;
    margin-top:10px;
}
input{
    margin-top:15px;
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
.successMessage{
    background-color:rgb(105, 223, 160);
    border-radius:20px;
    
}
</style>
 
<script>
    import http from "../api.js";

    export default {
        name: "registration",
        data() {
            return {
                pseudo: '',
                email: '',
                password:'',
                errors: [],
                success: '',
                file: ''
            }
        },

        methods: {
            checkForm: function (e) {
                this.errors = [];
                if (!this.pseudo) {
                    this.errors.push("Pseudo requis.");
                }
                if (!this.email) {
                    this.errors.push('Email requis.');
                } else if (!this.validEmail(this.email)) {
                    this.errors.push('Email valide requis.');
                }
                if (!this.password) {
                    this.errors.push("Mot de passe requis.");
                }
                if (!this.errors.length) {
                    this.register();
                    return true;
                }

                e.preventDefault();
            },
            validEmail: function (email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);//verif Regexp
            },
            handleFileUpload( event ){
                this.file = event.target.files[0];//{name: "....jpg", lastModified: ..., webkitRelativePath: "", size:...., type: "image/jpeg"}

            },

            register() {
                this.success = '';

                const formData = new FormData();
                if(this.file) {
                    formData.append('imagePost', this.file, this.file.filename);
                }
                formData.append('pseudo', this.pseudo);
                formData.append('email', this.email);
                formData.append('password', this.password);
                http.post('/auth/signup', formData)
                    .then(response => {
                        this.success = response.data.message;
                        this.$refs.inputImage.value=null;
                        this.file = '';
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
            if(userConnected) {
                window.location.href="/allMessages";
            }
        }

    }
</script>