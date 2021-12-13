<template>
  <div id="app">
  <!-- require соответствует v-bind-->
    <div id= "header"><img :src="require('./logo/icon.png')" alt="logo_Groupomania" id="logoImg"/></div> 
    <p id="sloganTexte">Pour vous et avec vous</p>
    <div id= "mainDiv">
          <div>
          <div id="nav" v-if="userPseudo == ''">
                <div id="connectInscrTexte">
                    <router-link to="/">Connexion</router-link> |
                    <router-link to="/register">Inscription</router-link>
                </div>
          </div>
              <div id="nav" v-else>
                  <div class="messageForm">
                    <span v-if="userImage"><img :src="userImage" id="avatar" width="60px"/></span><p id="userName">{{userPseudo.substr(0,1).toUpperCase()+ userPseudo.slice(1)}}</p>
                    <p><button @click="disconnect" id="buttonDeconnect" >Se déconnecter</button></p>
                    <p><button @click="disconnect" id="buttonDeconnectHide"><i class="fas fa-sign-out-alt"></i></button></p>
                  </div>
                   
              </div>
               <router-view/>
               </div>
    </div>
    
  </div>
</template>
<script>
  import http from "./api.js";
  export default {
    name:"app",
    data() {
      return { 
        userPseudo : '',
        userImage: '',
      }
    },
    methods: {
      checkConnection() {
        let userConnected = localStorage.getItem('user');
        this.userPseudo = '';
        if(userConnected) {
          let user = JSON.parse(userConnected);
          
           let formDatas = {"userId": user.userId, "pseudo": user.pseudo }
              
                http.post('/auth/checkValidUser', JSON.stringify(formDatas))  //back-end: user / exports.checkValidUser
                .then(() => {
                        this.userPseudo = user.pseudo;
                        this.userImage = user.userImage
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
        window.location.href="/"; //../components/Login.vue
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
  padding-top: 15px;
  padding-bottom:15px;
  width:95%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  justify-content: left;
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
#logoImg{
  
  height:200px;
  margin-top:-70px;
}
#sloganTexte{
  font-size: 25px;
  font-family: 'Corinthia', cursive;
  font-weight: bold;
}
#mainDiv {
  border: 3px solid rgb(14, 104, 146);
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%;
  background-color: rgb(218, 232, 238);
  display: flex;
  flex-direction: column;
}

.messageForm{
  border: 2px solid rgb(14, 104, 146);
  border-radius: 30px;
  margin-left:0px;
  margin-top: 0px;
  width:20%;
  display:flex;
  flex-direction:column;
   @media screen and (max-width: 550px){
     border: none;
     flex-direction:row;
  }
}
#connectInscrTexte{
  margin-left:auto;
  margin-right:auto;
}
#avatar{
  margin-top: 7px;
  border-radius: 90px;
}
#userName{
  font-weight: bold;
}
#buttonDeconnect{
  border-radius: 45px;
  padding: 7px;
  background:rgb(14, 104, 146);
  color: white;
  width: 60%;
  font-size: 14px;
  @media screen and (max-width: 1153px){
   font-size: 11px;
  }
  
  @media screen and (max-width: 940px){
     width: 80%;
  }
  @media screen and (max-width: 721px){
     display:none;
  } 
  @media screen and (max-width: 550px){
    display:inline;
    width: 110px;
    margin-left: 150%;
    }
    @media screen and (max-width: 470px){
    margin-left: 100%;
    }
    @media screen and (max-width: 435px){
    margin-left: 80%;
    }
     @media screen and (max-width: 360px){
    margin-left: 60%;
    width: 100px;
    font-size: 10px;
    }
  @media screen and (max-width: 315px){
       margin-left: 50%;
    }
     @media screen and (max-width: 283px){
       margin-left: 30%;
      width:80px;
      font-size: 8px;
    }
     @media screen and (max-width: 300px){
       margin-left: 30%;
    }
}
#buttonDeconnectHide{
  display:none;
  @media screen and (max-width: 721px){
    display:block;
    background:rgb(14, 104, 146);
    color: white;
    width: 60%;
    border-radius: 90px;
    margin-left:auto;
    margin-right: auto;
    }
    @media screen and (max-width: 550px){
    display:none;
    }
  }
  
</style>
