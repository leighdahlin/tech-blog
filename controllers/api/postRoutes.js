const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/',withAuth, async (req,res) => {
    try {
        const newPost = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.id,
        // user_id: req.session.user_id,
        });
        console.log(newPost)        
        res.status(200).json(newPost)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.put('/:id',withAuth, async (req,res) => {
    try {
        const newPost = await Post.update({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.id,
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