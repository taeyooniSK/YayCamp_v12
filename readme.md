# YayCamp

- Add Landing Page
- Add Campgorunds Page that lists all campgrounds

Each Campground has :

- name
- Image

# Layout and Basic Styling

- Create header and footer partials
- Add in Bootstrap

# Creating New Campgrounds

- Setup new campground POST route
- Add in body-parser
- Setup route to show form
- Add basic unstyled form

# Style the campgrounds page

- Add a better header/title
- Make campgrounds display in a grid

# Style the Navbar and Form
- Add a navbar to all templates
- Style the new campground form

# Add Mongoose (Yay_Camp_v2)
* Install and configure mongoose
* Setup campground model
* Use campground model inside of our routes

# Show Page
* Review the RESTful routes
* Add description to the campground model
* Show db.collection.drop()
* Add a show route/template

# Refactor Mongoose Code(Yay_Camp_v3)
* Create a models directory
* Use module.exports
* Require everything correctly

# Add Seeds File(Yay_Camp_v4)
* Add a seeds.js file
* Run the seeds file every time the server starts

# Add the Comment model
* Make errors go away
* Display comments on campground show page

# Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

# Style Show Page (Yay_Camp_v5)
* Add sidebar to show page
* Display comments nicely

# Finish Styling Show page
* Add public directory
* Add cutstom stylesheet

## Auth Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model

## Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

## Auth Pt. 3 - Login
* Add login routes
* Add login template

## Auth Pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly 

## Auth Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar correctly

## Refactor The Routes
* Use Express router to reorganize all routes

## Users + Comments (YayCamp_v8)
* Associate users and comments
* Save author's name to a comment automatically

## Users + Campgrounds (YayCamp_v9)
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

# Editing Campgrounds (YayCamp_v10)
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route

# Deleting Campgrounds
* Add Destroy Route
* Add Delete button

# Authorization Pt 1 : Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

# Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

# Deleting Comments
* Add Destory route
* Add Delete buttons

# Authorization Pt 2 : Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware

# Adding in Flash
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header