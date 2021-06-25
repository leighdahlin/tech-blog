const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        //get all posts to be displayed, get user's name
        const postData = await Post.findAll({
            include: [
                {
                model: User,
                attributes: ['name'],
                },
            ],
        });
        console.log("Before serialized" + postData); //see data before serialized
        res.json(postData)

        //The post data is serialized so the handlebars template can read it
        const posts = postData.map((post) => post.get({ plain:true }));

        console.log("After serialized" + posts); //see data after serialized

        //pass in the serialized data dn session into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        //get the post who's id is in the parameters
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: ['content','user_id','created_at']
                }
            ]
        });
        console.log("Before serialized" + postData); //see data before serialized
        res.json(postData)

        //The post data is serialized so the handlebars template can read it
        const post = postData.get({ plain:true });

        console.log("After serialized" + post); //see data after serialized

        //pass in the serialized data dn session into template
        res.render('homepage', {
            post,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})


//Use below if want to require the user to login to see content
// router.get('/login', (req, res) => {
//     if(req.session.logged_in) {
//         res.redirect('/dashboard');
//         return;
//     }

//     res.redirect('login');
// })

module.exports = router;