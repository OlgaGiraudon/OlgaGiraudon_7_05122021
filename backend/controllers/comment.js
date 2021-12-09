const db = require("../db");

exports.list = (req, res, next) => {
    var sql = "SELECT * FROM comment where postId = ? ORDER BY date DESC";//descending date
    db.query(sql, [req.body.postId], function (err, result) { 
        if(err) {
            res.status(500).json({ error: err });
            throw err;
        }
        return res.status(200).json(result);
    });

}

exports.create = (req, res, next) => {
    var sql = "INSERT INTO comment (postId, userId, commentaire, date) VALUES (?, ?, ?, NOW())";
    db.query(sql, [req.body.postId, req.body.userId, req.body.commentaire], function (err, result) {
        if(err) {
            res.status(500).json({ error: err });
            throw err;
        }
        return res.status(200).json({ message: 'Commentaire créé !' });
    });
}