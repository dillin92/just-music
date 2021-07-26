const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// get all posts for homepage
router.get('/', (req,res) => {
   console.log('======================')
   Post.findAll({
       attributes: [
           'id',
           'post_body',
           'title',
           'created_at'
       ],
       include: [
           {
               model: Comment,
               attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
               include: {
                   model: User,
                   attributes: ['email_address']
               }
           },
           { 
               model: User,
               attributes: ['email_address']
           }
       ]
   })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));

            res.render('homepage', { posts }); 
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login')
})


module.exports = router;