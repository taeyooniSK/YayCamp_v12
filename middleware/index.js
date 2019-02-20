const Campground = require("../models/campground");
const Comment = require("../models/comment");


// All the middleware goes here
const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err || !foundCampground){
            req.flash("error", "Campground not found") // 혹시나 데이터베이스에서 데이터를 찾지 못했을 때 유저에게 알려줄 수 있는 메시지
            res.redirect("back");
        }
        // if(foundCampground.author.id === req.user._id)  그래서 이런식으로 두 개를 비교하는건 불가능함 대신 몽구스의 메소드로 비교할 수 있음
        // Does user own the campground? 
        if(foundCampground.author.id.equals(req.user._id)){
        next();
        } else {
            req.flash("error", "Campground not found")
            res.redirect("back");
        }
    });
    } else {
        req.flash("error", "You don't have permission to do that"); // campground을 update하거나 destroy할때 로그인이 안되어있으면 이 메시지가 flash함
        res.redirect("back"); // 유저가 이 페이지 들어오기 직전 페이지로 돌려보냄
    }
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
if (req.isAuthenticated()){
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err || !foundComment) {
        console.log(err);
        res.redirect("back");
        }
        if(foundComment.author.id.equals(req.user._id)){ // req.user._id는 현재 로그인된 유저의 아이디
            next();
        } else {
            req.flash("error", "You don't have permission to do that");
            res.redirect("/campgrounds" + req.params.comment_id);
        }
    });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = (req, res, next) => {
if(req.isAuthenticated()){
    return next();
    }
    req.flash("error", "You need to be logged in to do that"); // 이 코드가 당장 어떤 메시지를 보여주진 않고 다음 request때  보여줌 그리고 우리는 /login 라우트를 처리해줘야함
    res.redirect("/login");
}


module.exports = middlewareObj;