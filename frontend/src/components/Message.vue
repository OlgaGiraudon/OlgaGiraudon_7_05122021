<template>
    <div>
        <div>
            <p>{{message.content}}</p>
            <p v-if="message.imageUrl"><img :src="message.imageUrl" width="100px"/></p>
            <p>Ecrit :{{ message.date | moment("from") }}</p>
            <p>Par : <span v-if="message.userImageUrl"><img :src="message.userImageUrl" width="30px"/></span> {{message.pseudo}}</p>
            <p>Nb likes : {{nbLikes}} </p>
            <button v-if="statutLike == 0" @click="addLike">Ajouter like</button>
            <button  v-else  @click="removeLike">Retirer like</button>
        </div>
        <div>Commentaires
            <div v-for="comment in comments"  :key="comment.commentId">
                <p>{{comment.message}}  </p>
                <p>Par : <span v-if="comment.userImageUrl"><img :src="comment.userImageUrl" width="30px"/></span> {{comment.pseudo}}  </p>
                <p>Ecrit :{{ comment.date | moment("from") }}</p>
            </div>
            <div>Ajouter un commentaire
            <form  v-on:submit.prevent="checkForm">
                <p v-if="errors.length">
                    <b>Merci de corriger les erreurs suivantes:</b>
                    <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
                <textarea name="contentComment" rows="1" class="form-control form-control-lg"  v-model="contentComment" placeholder="Contenu"></textarea>
                <button type="submit" class="btn btn-dark btn-lg btn-block">Ajouter</button>
            </form>
            </div>
        </div>
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
                statutLike: 0,
                comments: [],
                contentComment: '',
                errors: []
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

            async retrieveComments() {
                http.get('/comments/list',
                    {
                        params:  {"postId": this.messageDetail.postId },
                        headers: {
                            'Authorization': `bearer ${this.token}`
                        }
                }).then(response => {
                    this.comments =  response.data;
                })
                .catch(e => {
                    console.log(e);
                });
            },

            checkForm: function (e) {
                this.success = '';
                this.errors = [];
                if (!this.contentComment) {
                    this.errors.push('Contenu requis.');
                }   
                
                if (!this.errors.length) {
                    this.addMessage();
                    return true;
                }
                e.preventDefault();
            },

            async addMessage() {
                this.success = '';
                this.errors = '';

                let formDatas = {"postId":this.messageDetail.postId, "userId": this.userId, "message": this.contentComment }
                
                http.post('/comments/add', formDatas,
                    {
                    headers: {
                        'Authorization': `bearer ${this.token}`
                    }
                    })
                .then(response => {
                    this.success = response.data.message;
                    this.contentComment = '';
                    this.retrieveComments();

                })
                .catch(e => {
                    if(e.response) {
                        this.errors.push(e.response.data.error);
                    }
                });
            }

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
            this.retrieveComments();
        }
    }
</script>

<style></style>