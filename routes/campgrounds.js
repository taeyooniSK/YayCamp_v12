const express = require("express");
const router = require("express").Router();   
const Campground = require("../models/campground");    
const Comment = require("../models/comment");  
const middleware = require("../middleware");   // 여기서 보통 ../middleware/index라고 쓸려고 하겠지만 index.js파일은 굳이 언급을 안해도 디렉토리를 폴더까지만 지정해줘도 인식함

// INDEX - show all campgrounds
router.get("/", (req, res) => {
    // console.log(req.user);
    // Get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
      if (err){
        console.log(err);
      }
        res.render("campgrounds/index", { campsites: allCampgrounds});
    });
    
  });
  
  // CREATE - add new campground to DB
  router.post("/", middleware.isLoggedIn, (req, res) => {
    const name = req.body.name,
          price = req.body.price,
          image = req.body.image,
          description = req.body.description,
          author = {             //req.user에 있는 id와 username을 author라는 변수에 저장
            id : req.user._id,    
            username: req.user.username
          };
  
    const newCampground = { 
      name, 
      price,
      image,
      description,
      author     // 여기에 포함 시킴으로서 템플릿에서 사용할 수 있게되고 데이터베이스에도 그대로 저장이 되게끔 할 수 있음
    };
    // console.log(req.user);
  
    // Create a new campground and save to DB
    Campground.create(newCampground, (err, newlyCreated) => {
      if (err) console.log(err);
      // redirect back to campgrounds page
      console.log(newlyCreated);
      res.redirect("/campgrounds");
    });
    // campgrounds.push(campground);
   
  
  });
  // NEW - show form to create new campground
  router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
  });
  
  // SHOW - show more info about one campground
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    // find the campground with provided ID
    Campground.findById(id).populate("comments").exec( (err, foundCampsite) => {
      if (err || !foundCampsite){
        console.log(err);
        req.flash("error", "Sorry that campground does not exist");
        return res.redirect("/campgrounds");
      }
  
      //render show template with that campground
      console.log(foundCampsite);
      res.render("campgrounds/show", {campsite : foundCampsite});
    });
    
  });

  // EDIT CAMPGROUND ROUTE
  router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
      //is user logged in? 
      Campground.findById(req.params.id, (err, foundCampground) => {
        // if(err) {
        //   req.flash("error", "Campground not found")
        // } 여기에도 이렇게 할 수 있음
          res.render("campgrounds/edit", {campground: foundCampground});
      });
  });

  // UPDATE CAMPGROUND ROUTE
  router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
      if(err) {
        res.redirect("/campgrounds");
      }
      //redirect somewhere(show page)
        res.redirect("/campgrounds/" + req.params.id);
    });
  });

// DESTROY CAMPGROUND ROUTE
  router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    // find and delete the campground
    Campground.findByIdAndRemove(req.params.id, checkCampgroundOwnership, (err, removedCampground) => {
      if(err) console.log(err);
      // console.log("removed Campground: " + removedCampground);
      Comment.deleteMany({_id : {$in : removedCampground.comments }}, (err, removedComment) => { // 지워지는 해당 campgrounds에 있던 comments들을 지우는 방법
        if(err){
          res.redirect("/campgrounds");
        }
        res.redirect("/campgrounds");
      });
    }); 
  })

  function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/login");
  };


function checkCampgroundOwnership(req, res, next){ // 유저가 로그인했는지 그리고 로그인한 유저가 해당 캠프그라운드의 작성자와 동일 인물인지 확인하는 미들웨어
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err){
        console.log(err);
        res.redirect("back");
      }
      // if(foundCampground.author.id === req.user._id)  그래서 이런식으로 두 개를 비교하는건 불가능함 대신 몽구스의 메소드로 비교할 수 있음
      // Does user own the campground? 
      if(foundCampground.author.id.equals(req.user._id)){
        next();
      } else {
        res.redirect("back");
      }
    });
  } else {
    res.redirect("back"); // 유저가 이 페이지 들어오기 직전 페이지로 돌려보냄
  }
}


  module.exports = router;