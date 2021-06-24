const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


//User and post have one to many relationship
User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

//User and comment have one to many relationship
User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

//Post and comment have one to many relationship
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

module.exports = { User, Post, Comment }