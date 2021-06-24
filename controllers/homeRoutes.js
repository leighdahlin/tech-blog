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