<template>
    <div>
        <p>{{message.content}}</p>
        <p v-if="message.imageUrl"><img :src="message.imageUrl" width="100px"/></p>
        <p>Ecrit :{{ message.date | moment("from") }}</p>
        <p>Par : {{message.pseudo}}</p>
        <p>Nb likes : {{nbLikes}} </p>
        <button v-if="statutLike == 0" @click="addLike">Ajouter like</button>
        <button  v-else  @click="removeLike">Retirer like</button>
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
                userId: '',
                nbLikes:0,
                statutLike: 0
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
            async alreadyLike() {
                http.get('/like/checkAlreadyLike',
                    {
                        params:  {"postId": this.messageDetail.postId, "userId": this.userId },
                        headers: {
                            'Authorization': `bearer ${this.token}`
                        }
                }).then(response => {
                    if(response.data) {
                        if(response.data.message == 'already') {
                             this.statutLike = 1;
                        }
                    }
                })
                .catch(e => {
                    console.log(e);
                });
            },
            async addLike() {
                let formDatas = {"postId":this.messageDetail.postId, "userId": this.userId }
                http.post('/like/add', formDatas,
                    {
                        headers: {
                            'Authorization': `bearer ${this.token}`
                        }
                }).then(() => {
                    this.statutLike = 1;
                    this.retrieveLikes();
                })
                .catch(e => {
                    console.log(e);
                });
            },
            async removeLike() {
                let formDatas = {"postId":this.messageDetail.postId, "userId": this.userId }
                http.post('/like/remove', formDatas,
                    {
                        headers: {
                            'Authorization': `bearer ${this.token}`
                        }
                }).then(() => {
                    this.statutLike = 0;
                    this.retrieveLikes();
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
            this.alreadyLike();
        }
    }
</script>

<style></style>