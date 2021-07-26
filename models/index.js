const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Concerts = require('./Concerts');
const TopArtists = require('./topArtists');



User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User,{
    foreignKey:'user_id',
});

Comment.belongsTo(Post,{
   foreignKey:'post_id',
});

User.hasMany(Comment,{
    foreignKey: 'user_id',
});

Post.hasMany(Comment,{
    foreignKey:'post_id'
});

User.hasMany(Concerts, {
    foreignKey: 'user_id'
});

Concerts.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(TopArtists, {
    foreignKey: 'user_id'
});

TopArtists.belongsTo(User, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Comment, Concerts, TopArtists  };
