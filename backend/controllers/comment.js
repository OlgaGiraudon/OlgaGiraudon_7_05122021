const db = require("../db");

exports.add = (req, res, next) => {
    var sql = "INSERT INTO comments (postId, userId, message, date) VALUES (?, ?, ?, NOW())";
    
    db.query(sql, [req.body.postId, req.body.userId, req.body.message], function (err, result) {
        if(err) {
            res.status(500).json({ error: err });
            throw err;
        }
        return res.status(200).json({ message: 'Commentaire ajouté !' });
    });
}

exports.list = (req, res, next) => {
    var sql = "SELECT * FROM comments, user WHERE comments.userId = user.userId AND postId = ?  ORDER BY date DESC";

    db.query(sql, [req.query.postId], function (err, result) {
        if(err) {
            res.status(500).json({ error: err });
            throw err;
        }        
        return res.status(200).json(result);
    });

}