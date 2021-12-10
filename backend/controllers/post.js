const db = require("../db");

exports.list = (req, res, next) => {
    var sql = "SELECT * FROM post, user WHERE post.userId = user.userId  ORDER BY date DESC";
    db.query(sql, function (err, result) {
        if(err) {
            res.status(500).json({ error: err });
            throw err;
        }
        return res.status(200).json(result);
    });

}

exports.create = (req, res, next) => {
    var sql = "INSERT INTO post (content, imageUrl, date, userId) VALUES (?, ?, NOW(), ?)";
    let imageUrl = null;
    
    if(req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    db.query(sql, [req.body.content, imageUrl, req.body.userId], function (err, result) {
        if(err) {
            res.status(500).json({ error: err });
            throw err;
        }
        return res.status(200).json({ message: 'Post créé !' });
    });
}