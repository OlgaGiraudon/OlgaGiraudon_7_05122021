<template>
    <div>
        <p>{{message.content}}</p>
        <p v-if="message.imageUrl"><img :src="message.imageUrl" width="100px"/></p>
        <p>Ecrit :{{ message.date | moment("from") }}</p>
        <p>Par : {{message.pseudo}}</p>
        <p>Nb likes : {{nbLikes}} </p>
        <button>Ajouter like</button>
        <button>Retirer like</button>
    </div>
</template>

<script>
    import http from "../api.js";
    export default {
        name: 'Message',
        data (){
            return {
                messageDetail: this.message,
                token: '',
                nbLikes:0
            }
        },
        props: ['message'],
        methods: {
            async retrieveLikes() {
                http.get('/like/nbLikePost',
                    {
                        params:  {"postId": this.messageDetail.postId },
                        headers: {
                            'Authorization': `bearer ${this.token}`
                        }
                }).then(response => {
                    this.nbLikes =  response.data.nbLikes;
                })
                .catch(e => {
                    console.log(e);
                });
            },
        },
        mounted: function() {
            let userConnected = localStorage.getItem('user');
            if(!userConnected) {
                window.location.href="/";
            }
            let user = JSON.parse(userConnected);

            this.token = user.token;
            this.userId = user.userId;
            this.retrieveLikes();
        }
    }
</script>

<style></style>