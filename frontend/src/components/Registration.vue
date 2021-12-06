<template>
    <div class="registration_div">    
        <form>
            <h3>Inscription</h3>
 
            <div class="form-group">
                <label>Pseudo</label>
                <input type="text" class="form-control form-control-lg"/>
            </div>
 
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control form-control-lg" />
            </div>

 
            <div class="form-group">
                <label>Mot de passe</label>
                <input type="password" class="form-control form-control-lg" />
            </div>
 
            <button type="submit" class="btn btn-dark btn-lg btn-block">Enregistrer</button>
 
            <p class="forgot-password text-right">
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
    export default {
        data() {
            return {}
        }
    }
</script>