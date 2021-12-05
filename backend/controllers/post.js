const db = require("../db");

exports.list = (req, res, next) => {
    var sql = "SELECT * FROM post ORDER BY date DESC";
    db.query(sql, function (err, result) {
        if(err) {
            res.status(500).json({ error: err });
            throw err;
        }
        return res.status(200).json(result);
    });

}

exports.create = (req, res, next) => {
    var sql = "INSERT INTO post (content, date, userId) VALUES (?, NOW(), ?)";
    db.query(sql, [req.body.content, req.body.userId], function (err, result) {
        if(err) {
            res.status(500).json({ error: err });            
            throw err;
        }
        return res.status(200).json({ message: 'Post créé !' });
    });
}