const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
// const Concerts = require('./Concerts');
// // const Artist = require('./topArtists');
// const TopArtists = require('./topArtists');

// const Comment = require('./Comment');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    //onDelete: 'SET NULL'
});

// User.belongsToMany(Post, {
//     foreignKey: 'user_id',
// //     onDelete: 'SET NULL'
// });

Comment.belongsTo(User,{
    foreignKey:'user_id',
//     onDelete: 'SET NULL'
});

Comment.belongsTo(Post,{
   foreignKey:'post_id',
//    onDelete: 'SET NULL' 
});

User.hasMany(Comment,{
    foreignKey: 'user_id',
//     onDelete: 'SET NULL'
});

Post.hasMany(Comment,{
    foreignKey:'post_id'
});

// User.hasMany(Concerts, {
//     foreignKey: 'user_id'
// });

// Concerts.belongsTo(User, {
//     foreignKey: 'user_id'
// });

// User.hasMany(TopArtists, {
//     foreignKey: 'user_id'
// });

// TopArtists.belongsTo(User, {
//     foreignKey: 'post_id'
// });

module.exports = { User, Post, Comment };
