<template>
    <div class="login_div">
        <form v-on:submit.prevent="checkForm">
            <h3>Se connecter</h3>
        <div id="errorMessage">
            <p v-if="errors.length">
            <b>Merci de corriger les erreurs suivantes:</b>
            <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
            </p>
         </div>
            <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control form-control-lg" v-model="email"  placeholder="Email" />
            </div>
 
            <div class="form-group">
                <label>Mot de passe</label>
                <input type="password" class="form-control form-control-lg" v-model="password" placeholder="Mot de passe" />
            </div>
 
            <button type="submit">Connexion</button>
 
        </form>
    </div>
</template>

<script>
    import http from "../api.js";

    export default {
        name: "login",
        data() {
            return {
                email: '',
                password:'',
                errors: [],
                success: '',
            }
        },
        methods: {
            checkForm: function (e) {
                this.errors = [];                
                if (!this.email) {
                    this.errors.push('Email requis.');
                }
                if (!this.password) {
                    this.errors.push("Mot de passe requis.");
                }
                if (!this.errors.length) {
                    this.login();
                    return true;
                }

                e.preventDefault();
            },
            login() {
                this.success = '';
                let formDatas = {"email": this.email, "password": this.password }

                http.post('/auth/login', JSON.stringify(formDatas))
                .then(response => {  
                        this.success = response.data;
                        localStorage.setItem('user', JSON.stringify( this.success));
                        window.location.href="/allMessages";
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

<style lang="scss">
.login_div {
    width:40%;
    margin-left:auto;
    margin-right: auto;
    @media screen and(max-width:810px){
         width:70%;
    }
     @media screen and(max-width:410px){
         width:90%;
    }
}
h3 {
    font-size: 23px;
    border: 1px solid #3e82aa;
 
}
label, input, button {
    margin-bottom: 10px;
    margin-top: 5px;
}
button{
    background-color: rgb(14, 104, 146);
    color: white;
    border-radius:20px;
    width: 30%;
    min-width:100px;
    height: 40px;
}

</style>