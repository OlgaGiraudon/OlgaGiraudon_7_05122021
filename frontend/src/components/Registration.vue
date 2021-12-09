<template>
    <div class="registration_div">    
        <form @submit="checkForm">
            <h3>Inscription</h3>
            <p v-if="errors.length">
            <b>Merci de corriger les erreurs suivantes:</b>
            <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
            </p>
            <p v-if="success !== ''">{{ success}}</p>
 
            <div class="form-group">
                <label>Pseudo</label>
                <input type="text" class="form-control form-control-lg" v-model="pseudo"  placeholder="Pseudo"/>
            </div>
 
            <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control form-control-lg"  v-model="email"  placeholder="Email" />
            </div>

 
            <div class="form-group">
                <label>Mot de passe</label>
                <input type="password" class="form-control form-control-lg"  v-model="password" placeholder="Mot de passe" />
            </div>
 
            <button type="submit" class="btn btn-dark btn-lg btn-block">Enregistrer</button>
 
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
    text-align: center;
    
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
            }
        },

        methods: {
            checkForm: function (e) {
                this.errors = [];
                console.log('test');
                if (!this.pseudo) {
                    this.errors.push("Pseudo requis.");
                }
                if (!this.email) {
                    console.log(this.email)
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
                return re.test(email);
            },

            register() {
                this.success = '';
                let formDatas = {"pseudo":this.pseudo, "email": this.email, "password": this.password }

                http.post('/auth/signup', JSON.stringify(formDatas))
                    .then(response => {  
                        this.success = response.data.message;
                })
                .catch(e => { 
                    if(e.response) {
                        this.errors.push(e.response.data.error); 
                    }
                });

            }
        }

    }
</script>