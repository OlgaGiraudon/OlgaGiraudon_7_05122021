const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const SECRET_TOKEN = process.env.SECRET_TOKEN;

const db = require("../db");

exports.signup = (req, res, next) => {
    var sql = 'SELECT * FROM user WHERE email = ?';
    db.query(sql, [req.body.email], function (err, resultUserExist) {
      if(resultUserExist.length > 0) {
        return res.status(401).json({ error: 'Email existe déjà !' }); 
      }
      var sql = 'SELECT * FROM user WHERE pseudo = ?';
      db.query(sql, [req.body.pseudo], function (err, resultUserExist) {
        if(resultUserExist.length > 0) {
          return res.status(401).json({ error: 'Pseudo existe déjà !' }); 
        }
      let mdp = req.body.password;      
      if(mdp)
      {
        mdp = mdp.split('');
        if(mdp.length > 8){
          bcrypt.hash(req.body.password, 10)//password crypt
          .then(hash => {
            var sql = "INSERT INTO user (email, password, pseudo, userImageUrl) VALUES (?, ?, ?, ?)";
            if(req.file) {
              imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.name}`;
            }
            db.query(sql, [req.body.email, hash, req.body.pseudo, imageUrl], function (err, result) {
              if(err) {
                res.status(500).json({ error: err });
                throw err;
              }
              return res.status(200).json({ message: 'Utilisateur créé !' });
            });
          })
          .catch(error => res.status(500).json({ error: error })); 
        }
        else{
          return res.status(400).json({ error: 'Votre mot de passe est trop court. Veuillez creer un mot de passe de plus de 8 caractères'});
        }
      }
      else{
        return res.status(400).json({ error: 'Le mot de passe est vide'});
      }
    })
    });

    };
    exports.login = (req, res, next) => {
      var sql = 'SELECT * FROM user WHERE email = ?';
      db.query(sql, [req.body.email], function (err, resultUserExist) {
        if(err) {
          res.status(500).json({ error: err });
          throw err;
        }
        if(resultUserExist.length == 0) {
          return res.status(401).json({ error: 'User non trouvé' })
        }
        else{
          userPassword = resultUserExist[0].password;
          bcrypt.compare(req.body.password, userPassword)
            .then(valid => {
              if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
              }
              res.status(200).json({
                userId: resultUserExist[0].userId,
                pseudo: resultUserExist[0].pseudo,
                userImage: resultUserExist[0].userImageUrl,
                token: jwt.sign( //Token crypt
                  { userId: resultUserExist[0].userId },
                  SECRET_TOKEN,
                  { expiresIn: '24h' }
                )
              });

            })
            .catch(error => res.status(500).json({ error }));
        }
      })
    };

    exports.checkValidUser = (req, res, next) => {
      var sql = 'SELECT * FROM user WHERE userId = ? AND pseudo = ?';
      db.query(sql, [req.body.userId, req.body.pseudo], function (err, resultUserExist) {
        if(err) {
          res.status(500).json({ error: err });
          throw err;
        }
        if(resultUserExist.length == 0) {
          return res.status(401).json({ error: 'User non trouvé' })
        }
        else {
          return res.status(200).json({message: "ok"});
        }   
      })
    };

    exports.deleteUser = (req, res, next) => {
      var sql = "DELETE FROM comments WHERE userId = ?"
      db.query(sql, [req.body.userId], function (err, result) {
        if(err) {
            res.status(500).json({ error: err });
            throw err;
        }
      });
        var sql = "DELETE FROM likes WHERE userId = ?"
        db.query(sql, [req.body.userId], function (err, result) {
          if(err) {
            res.status(500).json({ error: err });
            throw err;
          }          
        }); 
        
        var sql = "DELETE FROM post WHERE userId = ?"
        db.query(sql, [req.body.userId], function (err, result) {
          if(err) {
            res.status(500).json({ error: err });
            throw err;
          }
        });

        var sql = "DELETE FROM user WHERE userId = ?"
        db.query(sql, [req.body.userId], function (err, result) {
          if(err) {
            res.status(500).json({ error: err });
            throw err;
          }
        });
        return res.status(200).json({ message: 'User supprimé !' });    
    
    }
