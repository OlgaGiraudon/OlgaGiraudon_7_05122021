<template>
    <div class="login_div">
        <form>
            <h3>Se connecter</h3>
 
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control form-control-lg" />
            </div>
 
            <div class="form-group">
                <label>Mot de passe</label>
                <input type="password" class="form-control form-control-lg" />
            </div>
 
            <button type="submit" class="btn btn-dark btn-lg btn-block">Connexion</button>
 
        </form>
    </div>
</template>

<style lang="scss">
.login_div {
    width:40%;
    text-align: center;
    
}
h3 {
    font-size: 23px;
    border: 1px solid #3e82aa;
}
label, input, button {
    margin-bottom: 10px;
    margin-top: 5px;
}

</style>
 
<script>
    export default {
        data() {
            return {}
        }
    }
</script>