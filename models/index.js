const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment')
const Concert = require('./Concerts');
const TopArtist = require('./topArtists')

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

User.hasMany(Concert,{
    foriegnKey:'user_id'
});

Concert.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(TopArtist,{
    foriegnKey: 'user_id'
})


module.exports = { User, Post, Comment, Concert, TopArtist};
