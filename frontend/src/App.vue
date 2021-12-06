<template>
  <div id="app">
    <div id= "header"><img :src="require('./assets/img/icon.png')" alt="" width="50px" />Groupomania - pour vous et avec vous</div>
    <div id= "mainDiv">
          <div id="nav">
                <router-link to="/">Connexion</router-link> |
                <router-link to="/register">Inscription</router-link>      
          </div>
            <router-view/>
    </div>
    <div>footer</div>
  </div>
</template>

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
  font-size: 25px;
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
