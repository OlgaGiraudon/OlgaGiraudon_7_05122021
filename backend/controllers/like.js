const db = require("../db");

exports.nbLikePost = (req, res, next) => {
    var sql = "SELECT COUNT(*) AS nbLikes FROM likes where postId = ?";
    db.query(sql, [req.query.postId], function (err, result) {
        if(err) {
            res.status(500).json({ error: err });
            throw err;
        }
        return res.status(200).json(result[0]);
    });

}

exports.add = (req, res, next) => {
    var sql = "INSERT INTO likes (postId, userId) VALUES (?, ?)";
    db.query(sql, [req.body.postId, req.body.userId], function (err, result) {
        if(err) {
            res.status(500).json({ error: err });
            throw err;
        }
        return res.status(200).json({ message: 'Like ajouté !' });
    });
}


exports.remove = (req, res, next) => {
    var sql = "DELETE FROM likes WHERE postId = ? AND userId = ?";
    db.query(sql, [req.body.postId, req.body.userId], function (err, result) {
        if(err) {
            res.status(500).json({ error: err });
            throw err;
        }
        return res.status(200).json({ message: 'Like supprimé !' });
    });
}

exports.checkAlreadyLike = (req, res, next) => {
    var sql = "SELECT * FROM likes where postId = ? AND userId = ?";
    db.query(sql, [req.body.postId, req.body.userId], function (err, result) {
        if(err) {
            res.status(500).json({ error: err });
            throw err;
        }
        if(result.length > 0)
        {
            return res.status(200).json({ message: 'already like !' });
        }
    });

}