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
                attributes: ['name','id'],
                }
            ],
        });
        console.log("Before serialized" + postData); //see data before serialized
        // res.json(postData)

        //The post data is serialized so the handlebars template can read it
        const posts = postData.map((post) => post.get({ plain:true }));

        console.log("After serialized" + posts); //see data after serialized

        //pass in the serialized data dn session into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        //get the post who's id is in the parameters
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    //figure out how to pull the username associated with the user id
                    model: Comment,
                    attributes: ['content','user_id','created_at']
                }
            ]
        });
        // res.json(postData)

        //The post data is serialized so the handlebars template can read it
        const post = postData.get({ plain:true });

        //pass in the serialized data dn session into template
        res.render('postview', {
            post,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        });

    } catch (err) {
        res.status(500).json(err)
    }
});

//add withAuth to get request once login has been done
router.get('/dashboard/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                    model : Post,
                    attributes : ['title', 'content','created_at']
                }
            ]
        });
        // res.json(userData)
        const user = userData.get({ plain:true });

        res.render('dashboard', {
            user,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        });


    } catch (err) {
        res.status(500).json(err)
    }
    // res.render('dashboard')
})


router.get('/login', (req, res) => {
    //if the user is logged in, redirect them to their dashboard
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

module.exports = router;