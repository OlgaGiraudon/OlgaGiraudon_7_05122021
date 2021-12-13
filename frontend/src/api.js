import axios from "axios";  
//Создаем объект, который затем будет подготавливать запросы API  при помощи библиотеки аксиос.Create an object that will then prepare API requests
export default axios.create({  
  baseURL: "http://localhost:3000/api",  
  headers: {  
    "Content-type": "application/json"  
  }  
});