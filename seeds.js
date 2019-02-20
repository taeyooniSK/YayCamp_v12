const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
    {
        name: "Rest in a beautiful place!",
        image: "https://pixabay.com/get/e835b20e29f0003ed1584d05fb1d4e97e07ee3d21cac104490f0c17ba4eab7be_340.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae qui, blanditiis consequatur molestiae, quos doloribus labore eligendi atque error quam nam accusantium earum repudiandae incidunt autem quisquam omnis nemo sit laudantium hic, at impedit? Praesentium corporis facere ullam hic! Perferendis placeat quis consectetur. Obcaecati, quia. Nesciunt aspernatur iste odio ipsam consectetur porro enim, omnis sit velit quo, commodi consequuntur, quisquam eum ratione laborum quis! Odit, ex pariatur. Omnis voluptatem sunt aspernatur, nemo ab laboriosam? Ab enim quia delectus quos expedita vel! Magni, voluptatem. Eaque dolorem earum dolor illo nulla fugit iusto. Tenetur, pariatur, maiores numquam repudiandae sapiente, ut et enim veniam eos iste explicabo a est culpa quisquam porro molestiae architecto? Vitae veniam nostrum eos voluptas inventore quidem ab eveniet neque accusantium aliquam consequuntur tempora, quo beatae debitis numquam minus sequi quisquam fugiat qui enim! Aut, rem. Animi, consectetur? Temporibus illo doloremque quo cum hic dolorum culpa perspiciatis odio veniam."
    },
    {
        name: "Camp !!!!",
        image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104490f0c17ba4eab7be_340.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae qui, blanditiis consequatur molestiae, quos doloribus labore eligendi atque error quam nam accusantium earum repudiandae incidunt autem quisquam omnis nemo sit laudantium hic, at impedit? Praesentium corporis facere ullam hic! Perferendis placeat quis consectetur. Obcaecati, quia. Nesciunt aspernatur iste odio ipsam consectetur porro enim, omnis sit velit quo, commodi consequuntur, quisquam eum ratione laborum quis! Odit, ex pariatur. Omnis voluptatem sunt aspernatur, nemo ab laboriosam? Ab enim quia delectus quos expedita vel! Magni, voluptatem. Eaque dolorem earum dolor illo nulla fugit iusto. Tenetur, pariatur, maiores numquam repudiandae sapiente, ut et enim veniam eos iste explicabo a est culpa quisquam porro molestiae architecto? Vitae veniam nostrum eos voluptas inventore quidem ab eveniet neque accusantium aliquam consequuntur tempora, quo beatae debitis numquam minus sequi quisquam fugiat qui enim! Aut, rem. Animi, consectetur? Temporibus illo doloremque quo cum hic dolorum culpa perspiciatis odio veniam."
    },
    {
        name: "Yayiks!!!!!!!",
        image: "https://farm5.staticflickr.com/4151/5012194135_b2781cc17c.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae qui, blanditiis consequatur molestiae, quos doloribus labore eligendi atque error quam nam accusantium earum repudiandae incidunt autem quisquam omnis nemo sit laudantium hic, at impedit? Praesentium corporis facere ullam hic! Perferendis placeat quis consectetur. Obcaecati, quia. Nesciunt aspernatur iste odio ipsam consectetur porro enim, omnis sit velit quo, commodi consequuntur, quisquam eum ratione laborum quis! Odit, ex pariatur. Omnis voluptatem sunt aspernatur, nemo ab laboriosam? Ab enim quia delectus quos expedita vel! Magni, voluptatem. Eaque dolorem earum dolor illo nulla fugit iusto. Tenetur, pariatur, maiores numquam repudiandae sapiente, ut et enim veniam eos iste explicabo a est culpa quisquam porro molestiae architecto? Vitae veniam nostrum eos voluptas inventore quidem ab eveniet neque accusantium aliquam consequuntur tempora, quo beatae debitis numquam minus sequi quisquam fugiat qui enim! Aut, rem. Animi, consectetur? Temporibus illo doloremque quo cum hic dolorum culpa perspiciatis odio veniam."
    }
];

function seedDB(){
    // Remove all campgrounds
    Campground.remove({},  err => {
        if (err) console.log(err);
        console.log("removed campgrounds!");
        // add a few camgprounds
        data.forEach(seed => {
            Campground.create(seed, (err, campground) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                     // create a comment
                    Comment.create(
                        {
                            text: "This place is greate, but I wish there was internet", 
                            author: "Homer"
                        }, (err, comment) => {
                            if(err) console.log(err);
    
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        });
                }
            });
        });
    });
    
    // add a few comments
};


module.exports = seedDB;

