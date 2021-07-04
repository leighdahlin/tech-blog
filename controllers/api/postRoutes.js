const router = require('express').Router();
const { response } = require('express');
const { Post, Comment, User } = require('../../models');
const { restore } = require('../../models/User');
const withAuth = require('../../utils/auth');

router.get('/new/:id', withAuth, async (req, res) => {
    try {
        res.render('createpost', {
            logged_in: req.session.logged_in,
            user_id: req.session.user_id,
        });
    } catch (err) {
        res.status(404).json(err)
    }
    
})

router.post('/new/:id', async (req,res) => {
    try {
        const newPost = await Post.create({
        ...req.body,
            user_id: req.params.id,
        });
        console.log(newPost)        
        res.status(200).json(newPost)
    } catch (err) {
        res.status(500).json(err)
    }
});


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
        ...req.body,
        user_id: req.session.user_id,
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

router.delete('/:id', async (req,res) => {
    try {
        const postData = await Post.destroy(
        {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });

        if(!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;      
        }
        console.log(postData)        
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;