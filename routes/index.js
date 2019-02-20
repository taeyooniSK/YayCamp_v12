const express = require("express");
const router = require("express").Router();    
const passport = require("passport");
const User = require("../models/user");    

//root
router.get("/", (req, res) => {
    res.render("landing");
  });

// show register form
router.get("/register", (req, res) => {
    res.render("register");
  });
  
  // handle sign up logic
  router.post("/register", (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => { // passport-local-mongoose pacakges에서 제공되는 메소드
      if(err){
        req.flash("error", err.message); // err argument에 error에 대한 정보가 있음 (passport에서 오는 데이터) err가 없으면 비어있지만 만약 있다면 username 이 이미 taken됐다거나 비밀번호가 안맞다 라는 등의 데이터 담겨져있음
        return res.render("register"); // short-circuit
      }
      passport.authenticate("local")(req, res, () => {
        req.flash("success", "Welcome to YayCamp " + user.username);
        res.redirect("/campgrounds");
      })
    }); 
  });
  // show login form
  router.get("/login", (req, res) => {
    // res.render("login", {message: "ERROR YOU MESSED IT UP!!!"});
    
    res.render("login");
  });
  
  // handling login logic 이 패턴임 app.post("/login", middleware, callback)
  router.post("/login", passport.authenticate("local",
   { 
      successRedirect : "/campgrounds",
      failureRedirect: "/login"
    }),(req, res) => {
      
  });
  
  // logout route
  router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged you out!"); // 로그아웃 한 다음에 아래의 redirect되는 페이지로 가기전 header.ejs에 success라는 property안에 flash mesasge가 들어가있음
    res.redirect("/campgrounds");
  });
  
  // // middleware
  // function isLoggedIn(req, res, next){
  //   if(req.isAuthenticated()){
  //     return next();
  //   }
  //   res.redirect("/login");
  // };

  module.exports = router;