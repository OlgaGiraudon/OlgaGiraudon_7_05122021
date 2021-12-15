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
                    <div id="divAvatar_deleteButton">
                        <button @click="deleteUser" id="buttonDeleteUser" data-tooltip="Supprimer mon compte" aria-label="buttonDeleteUser"><i class="fas fa-trash-alt"></i></button>
                        <span v-if="userImage" id="spanLogo"><img :src="userImage" id="avatar" alt= "Avatar" width="60px"/>
                        <p id="userName">{{userPseudo.substr(0,1).toUpperCase()+ userPseudo.slice(1)}}</p></span>
                    </div>
                    <div id="divButtonDeconnect">
                        <button @click="disconnect" id="buttonDeconnect" aria-label="buttonDeconnect">Se déconnecter</button>
                        <button @click="disconnect" id="buttonDeconnectHide" aria-label="buttonDeconnectVersionImage"><i class="fas fa-sign-out-alt"></i></button>
                         
                    </div>
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
      },
      deleteUser() {
        if(confirm("Voulez-vous vraiment supprimer votre compte ?")){
          let userConnected = localStorage.getItem('user');
          this.userPseudo = '';
          if(userConnected) {
            let user = JSON.parse(userConnected);
            
            let formDatas = {"userId": user.userId }
                
                  http.post('/auth/deleteUser', JSON.stringify(formDatas),
                  {
                    headers: {
                    'Authorization': `bearer ${user.token}`}
                  }
                  )  
                  .then(() => {
                        localStorage.removeItem('user');
                        this.userPseudo = '';
                        this.userImage = '';
                        window.location.href="/";
                        }
                  )
                  .catch( () => {
                    
                      localStorage.removeItem('user');
                      this.userPseudo = '';
                      window.location.href="/";
                      }
                  );
          }
        }
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
  @media screen and (max-width:600px){
    width:90%;
    margin-right:auto;
    margin-left:auto;
  }
}
#divAvatar_deleteButton {
 width:95%;
 @media screen and (max-width: 600px){
   width:100%;
   display:flex;
   flex-direction:row;
   justify-content: left;
   
 }
}
#divButtonDeconnect {
  width:95%;
}
#spanLogo{
   @media screen and (max-width: 600px){
   margin-left: auto;
   margin-right: auto;
   
 }
}
#connectInscrTexte {
  margin-left:auto;
  margin-right:auto;
}
#avatar{
  margin-top: 7px;
  border-radius: 90px;
  @media screen and (max-width:600px){
    width:80px;
  }
    
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
  margin-bottom:7px;
  margin-right:auto;
  margin-left:auto;
   @media screen and (max-width: 1240px){
     width: 70%;
   }
   @media screen and (max-width: 1067px){
     width: 75%;
   }
   @media screen and (max-width: 998px){
     width: 80%;
     font-size: 13px;
   }
   @media screen and (max-width: 870px){
      padding:4px;
       width: 85%;
      font-size: 12px;
      }
   @media screen and (max-width: 800px){
     display:none;
      }
}
#buttonDeconnectHide{
  display:none;
  
  @media screen and (max-width: 800px){
     display:block;
      border-radius: 45px;
      padding: 4px;
      background:rgb(14, 104, 146);
      color: white;
      width: 45%;
      margin-bottom:7px;
      margin-right:auto;
      margin-left:auto;
      }
      @media screen and (max-width: 600px){
      width: 60px;
      margin-left:1%;
      height:40px;
      }
  }

#buttonDeleteUser{
    background-color: #610B21;
    color:white;
    width: 50px;
    border-radius: 15px;
    margin-left:75%;
    margin-top:7px;
      @media screen and (max-width: 1073px){
      margin-left:70%;
      }
      @media screen and (max-width: 970px){
      margin-left:65%;
      }
      @media screen and (max-width: 870px){
      margin-left:60%;
      }
      @media screen and (max-width: 760px){
      margin-left:50%;
      width: 45px;
      }
      @media screen and (max-width:600px){
      margin-left:1%;
      height:40px;
      width: 60px;
      }
      
  }

  
  [data-tooltip]::after {
    content: attr(data-tooltip); /* Texte */
    position: absolute; 
    width: 200px; 
    left: 300px; top: 200px; 
    background: #3989c9; 
    color: #fff; 
    padding: 0.5em; 
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); 
    pointer-events: none; /* texte */
    opacity: 0; 
    transition: 1s; 
    border-radius:15px;
    @media screen and (max-width:600px){
      display:none;
     
      }
   } 
   [data-tooltip]:hover::after {/* Show tooltop */
    opacity: 1; 
    top: 200px; 
    @media screen and (max-width:600px){
      display:none;
     
      }
   }
</style>
