//Dependencies
var express = require("express");
var router = express.Router();
var db = require("../models");

module.exports = function (passport) {
    //Checks to see if the user is logged in or not.
    //Checks to see if the user is "removed" or not. If they are render's the 404 page
    router.get("/dashboard", isLoggedIn, function(req, res) {
        console.log("The user id " + req.user.profile_id);
        if (req.user.removed === true) {
            res.render("404");
        }
    });

    //Router to remove the user session once they click on the logout button
    router.get("/logout", function(req, res) {
        req.session.destroy(function(err) {
            res.redirect("/");
        });
    });

    //Router to create an account and runs through to check in the database to see
    //if the account is registered or hasn't been registered yet
    router.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/dashboard",
        failureRedirect: "/"
    }
    ));

    //Router to check if the user logging in has a valid account with the correct credential in the database
    router.post("/signin", passport.authenticate("local-signin", {
        successRedirect: "/dashboard",
        failureRedirect: "/"
    }
    ));
    return router;
}

//function to chek if the user is logged in or not
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect("/")
}