<template>
    <div id="listOfCommentsMain">
        <div id="userPostedLogo">
            <span v-if="message.userImageUrl"><img :src="message.userImageUrl" width="30px" id="postAvatar"/></span> {{message.pseudo.substr(0,1).toUpperCase()+ message.pseudo.slice(1)}} 
        
        </div>
        <div id="messagePosted">    
            <p id="messageTime">Ecrit : {{ message.date | moment("from") }}</p>
            <p id="messageText">{{message.content}}</p>
            <p id="messageImg" v-if="message.imageUrl"><img :src="message.imageUrl" width="150px"/></p>
           
            <div id="likesDiv">
                <p id="nblikes"><i class="far fa-thumbs-up"></i>: {{nbLikes}} </p>
                <button v-if="statutLike == 0" @click="addLike" class="appreciateButton"><i class="far fa-thumbs-up"></i></button>
                <button  v-else  @click="removeLike" class="appreciateButton"><i class="far fa-thumbs-down"></i></button>
            </div>
            <div v-for="comment in comments"  :key="comment.commentId" id="commentMessage">
                <p><span v-if="comment.userImageUrl"><img :src="comment.userImageUrl" width="30px"/></span> {{comment.pseudo.substr(0,1).toUpperCase()+ comment.pseudo.slice(1)}} a répondu: </p>
                <p id="commentText">{{comment.message}}  </p>
                
                <p id="commentDate">Ecrit :{{ comment.date | moment("from") }}</p>
            </div>
            <div>
            <form  v-on:submit.prevent="checkForm">
            <div id="errorComment">
                <p v-if="errors.length">
                    <b>Merci de corriger les erreurs suivantes:</b>
                    <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
            </div>
                 <textarea name="contentComment" rows="1" class="form-control form-control-lg commentaireForm"  v-model="contentComment" placeholder="Commentaire"></textarea>
                <button type="submit" class="commentButton" ><i class="far fa-comment"></i></button>
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

<style>
#listOfCommentsMain{
    border:2px solid rgb(14, 104, 146);
    width:95%;
    border-radius: 15px;
    margin-right:auto;
    margin-left:auto;
    margin-top:15px;
    display:flex;
    flex-direction: row;
    margin-bottom:5px;
}
#userPostedLogo{
    display:flex;
    flex-direction: column;
    width:20%;
}
#postAvatar{
    width:45px;
    border-radius:90px;
    margin-top: 20px;
}
#messagePosted{
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    
}
#messageTime{
    width:100%;
    font-size:12px;
    text-align:left;
}
#messageText{
    font-size:15px;
    word-wrap:break-word;
    text-align:left;
    font-weight:bold;
}
#messageImg{
 text-align:left;
}
#likesDiv{
    display:flex;
    flex-direction:row;
    width:90%;
    justify-content: left;
    margin-bottom:10px;

}
.appreciateButton{
    width: 75px;
    height:35px;
    background-color:rgb(14, 104, 146);
    border-radius: 30px;
    color:white;
    margin-left:15px;
}
#nblikes{
    margin-top:5px;
}
.commentaireForm{
    font-size:13px;
    height: 30px!important;
    width:60%;
    margin-left:20%;
}
.commentButton{
    background-color:rgb(14, 104, 146);
    border-radius: 20px;
    color:white;
    width:  55px;
    font-size:14px;
    margin-top:5px;
    margin-bottom: 5px;
    margin-left:54%;
}
#commentMessage{
    width: 60%;
    text-align:left;
    margin-left:20%;
    border:1px solid rgb(14, 104, 146);
    border-radius:15px;
    margin-bottom:5px;
    word-wrap:break-word;
}
#commentText{
    font-weight:bold;
}
#commentDate{
    font-size:11px;
}
#errorComment{
    background-color:rgb(236, 142, 142);
    border-radius:20px;
    width:60%;
    margin-left:20%;
    text-align:left;
    padding-left:15px;
}
</style>