const express = require("express");
const router = require("express").Router({mergeParams: true});  
const Campground = require("../models/campground");    
const Comment = require("../models/comment");   
const middleware = require("../middleware");   

// Comments new
router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
      if(err) console.log(err);
      res.render("comments/new", {campground});
    });
    
});


// Comments Create
router.post("/", middleware.isLoggedIn, (req, res) => {
    // look up campground using ID
    Campground.findById(req.params.id, (err, campground) => {
      if(err){
        console.log(err);
        res.redirect("/campgrounds");
      } 
        Comment.create(req.body.comment, (err, comment) => {
          if(err) {
            req.flash("error", "Something went wrong");
            console.log(err);
          } 
          // add username and id to comment
            comment.author.id = req.user._id;  // comment model에 따름
            comment.author.username = req.user.username;
          // console.log("New comment's username will be : " + req.user.username);
          // save comment
            comment.save();
            campground.comments.push(comment);
            campground.save();
            console.log(comment);
            req.flash("success", "Successfully added comment")
            res.redirect(`/campgrounds/${campground._id}`);
          
        });

    });
});

// EDIT COMMENT

// /campgrounds/:id/edit
// /campgrounds/:id/comments/:comment_id/edit ( nested route )

  router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    // Campground.findById(req.params.id, (err, foundCampground) => { // 이 코드로 Campground의 데이터 전체를 가져와서 edit 템플릿 페이지에 적용하려했는데 
    //   if(err) {                                                    // 사실 edit 템플릿에서는 campground의 아이디만 필요하기 때문에 모든 데이터를 가져올 필요가 없다.
    //     res.redirect("back");                                     //그래서 req.params.id를 하면 (app.js 참고) campground의 id를 얻을 수 있으니 그 정보만 넘겨주면됨
    //   }
      
    // });
    const campground_id = req.params.id;
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err) {
        res.redirect("back");
      }
        res.render("comments/edit", {campground_id, comment : foundComment});
    });
  });

// UPDATE COMMENT

router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
    if(err) {
      res.redirect("back");
    }
      res.redirect("/campgrounds/" + req.params.id);
  });
});

// DELETE COMMENT

router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err, removedComment) => {
    if(err) {
      res.redirect("back"); 
    }
      req.flash("success", "Comment deleted");
      res.redirect("back"); 
  });
});


//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/login");
  };


function checkCommentOwnership(req, res, next){
  if (req.isAuthenticated()){
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err) {
        console.log(err);
        res.redirect("back");
      }
        if(foundComment.author.id.equals(req.user._id)){ // req.user._id는 현재 로그인된 유저의 아이디
          next();
        } else {
          res.redirect("/campgrounds" + req.params.comment_id);
        }
    });
  } else {
    res.redirect("back");
  }
}

module.exports = router;