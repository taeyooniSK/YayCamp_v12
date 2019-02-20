const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      flash = require("connect-flash"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      methodOverride = require("method-override"),
      Campground = require("./models/campground"),
      Comment = require("./models/comment"),
      User = require("./models/user"),
      seedDB = require("./seeds");

// requiring routes
const commentRoutes = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes = require("./routes/index");
    
mongoose.connect("mongodb://localhost/yay_camp_v11", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Something is something!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // passport-local-mongoose 에서 오는 메소드
passport.serializeUser(User.serializeUser()); // passport-local-mongoose 에서 오는 메소드
passport.deserializeUser(User.deserializeUser()); // passport-local-mongoose 에서 오는 메소드

app.use((req, res, next) => {
  res.locals.currentUser = req.user; // req.user는 passport에서 제공해주는 로그인한 사용자의 정보를 포함하고 있다.
  res.locals.error = req.flash("error"); // 모든 템플릿에서 error라는 이름으로 사용할 수 있음
  // console.log(res.locals.error);
  res.locals.success = req.flash("success"); 
  // res.locals.message = req.flash("error"); // message라는 프로퍼티를 모든 template에서 사용할 수 있게 됨
  next();
})

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



app.listen(3000, () => {
  console.log("Server is listening to 3000 !");
});
