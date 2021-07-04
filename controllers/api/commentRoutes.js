const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
// const withAuth = require('../../utils/auth');

router.post('/', async (req,res) => {
    try {
        const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        });
        console.log(newComment)        
        res.status(200).json(newComment)
    } catch (err) {
        res.status(500).json(err)
    }
});

// router.put('/:id', async (req,res) => {
//     try {
//         const newPost = await Comment.update({
//         content: req.body.content,
//         user_id: req.body.id,
//         // user_id: req.session.user_id,
//         },
//         {
//             where: {
//                 id: req.params.id,
//             }
//         });
//         console.log(newPost)        
//         res.status(200).json(newPost)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// });

// router.delete('/:id', async (req,res) => {
//     try {
//         const newPost = await Comment.destroy(
//         {
//             where: {
//                 id: req.params.id,
//             }
//         });
//         console.log(newPost)        
//         res.status(200).json(newPost)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// });

module.exports = router;