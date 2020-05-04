/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Tianshi
 * @Date: 2020-05-03 04:13:29
 * @LastEditors: Tianshi
 * @LastEditTime: 2020-05-04 05:02:11
 */

var config = require('../db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);
const commonJS = require('../utils/common.js');

exports.login = login;
exports.signup = signup;
/**
 * 
 * Login
 * 
 * @param {_} req 
 * @param {_} res 
 * @param {_} next 
 * 
 * @return 
 */
function login(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var query = `SELECT user.password AS password, user.id AS id FROM user WHERE email = '${email}';`;

    connection.query(query, function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            if (rows[0] == null) {
                res.send(commonJS.createJsonString(false, null, "No such user"));
                return
            } else if (rows[0].password == password) {
                // console.log("success login\n");
                res.send(commonJS.createJsonString(true, rows[0].id, "Login Successfully"));
                return
            } else {
                res.send(commonJS.createJsonString(false, null, "Incorrect password"));
            }

        }
    });
}

/**
 * 
 * Login
 * 
 * @param {_} req 
 * @param {_} res 
 * @param {_} next 
 * 
 * @return 
 */
function signup(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    var query = `SELECT * FROM user WHERE email = '${email}';`;

    connection.query(query, function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {


            if (typeof rows[0] != 'undefined') {

                console.log('Already exists email ', email)

                res.send(commonJS.createJsonString(false, null, "User has already registered using the email"))
                return
            } else {

                if (err) throw err;

                var sql = "INSERT INTO user (id, email, password) VALUES ?";
                var values = [
                    [null, email, password],
                ];
                connection.query(sql, [values], function (err, result) {
                    if (err) throw err;

                    res.send(commonJS.createJsonString(true, result.insertId, "Registered Successfully"))
                });
            }


        }
    });
}