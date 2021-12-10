<template>
  <div id="app">
    <div id= "header"><img :src="require('./logo/icon.png')" alt="logo_Groupomania"/></div>
    <p>Pour vous et avec vous</p>
    <div id= "mainDiv">
          <div id="nav" v-if="userPseudo == ''">
                <router-link to="/">Connexion</router-link> |
                <router-link to="/register">Inscription</router-link>
          </div>
          <div id="nav" v-else>
          Vous êtes connectés en tant que : {{ userPseudo}}
          <p><button @click="disconnect">Se déconnecter</button></p>
          </div>
        <router-view/>
    </div>
    <div>footer</div>
  </div>
</template>
<script>
  import http from "./api.js";
  export default {
    name:"app",
    data() {
      return { 
        userPseudo : ''
      }
    },
    methods: {
      checkConnection() {
        let userConnected = localStorage.getItem('user');
        this.userPseudo = '';
        if(userConnected) {
          let user = JSON.parse(userConnected);
           let formDatas = {"userId": user.userId, "pseudo": user.pseudo }

                http.post('/auth/checkValidUser', JSON.stringify(formDatas))
                .then(() => {
                        this.userPseudo = user.pseudo
                        }
                )
                .catch( () => {
                  
                    localStorage.removeItem('user');
                    this.userPseudo = '';
                     window.location.href="/";
                    }
                );
        }
      },
      disconnect() {
        localStorage.removeItem('user');
        this.userPseudo = '';
        window.location.href="/";
      }
    },
    mounted: function() {
      this.checkConnection();       
    }
  }

</script>

<style lang="scss">
body{
 background-color: rgb(174, 209, 223);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 15px;

  a {
    font-weight: bold;
    color: #2c3e50;
    

    &.router-link-exact-active {
      color: #428db9;
    }
  }
}
#header{
  border: 3px solid rgb(14, 104, 146);
  width: 100%;
  height: 65px;
}
#header img{
  
  height:130px;
  margin-top:-30px;
}

#mainDiv {

  border: 3px solid rgb(14, 104, 146);
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%;
  background-color: rgb(218, 232, 238);
  display: flex;
  flex-direction: column;
  align-items: center;

}

</style>
