const router = require('express').Router();
const { response } = require('express');
const { Post, Comment, User } = require('../../models');
const { restore } = require('../../models/User');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        res.render('createpost', {
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        });
    } catch (err) {
        res.status(404).json(err)
    }
    
})

router.post('/', async (req,res) => {
    try {
        console.log("YOU ARE IN THE POST REQUEST")
        // console.log(req)
        const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
        });
        console.log(newPost)        
        res.status(200).json(newPost)
    } catch (err) {
        res.status(500).json(err)
    }
});

// router.post('/', async (req,res) => {
//     try {
//         console.log("YOU ARE IN THE POST REQUEST")
//         const post = await req.body;
//         post.user_id = await req.session.user_id;
//         const newPost = await Post.create(post);
        
//         res.status(200).json(newPost)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// });
router.get('/:id',withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        const post = postData.get({ plain:true });

        res.render('editpost', {
            post,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        });
    } catch (err) {
        res.status(404).json(err)
    }
});

router.put('/:id',withAuth, async (req,res) => {
    try {
        const newPost = await Post.update({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.id,
        // user_id: req.session.user_id,
        },
        {
            where: {
                id: req.params.id,
            }
        });
        console.log(newPost)        
        res.status(200).json(newPost)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:id',withAuth, async (req,res) => {
    try {
        const newPost = await Post.destroy(
        {
            where: {
                id: req.params.id,
            }
        });
        console.log(newPost)        
        res.status(200).json(newPost)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;