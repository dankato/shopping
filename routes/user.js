const router = require('express').Router();
const User = require('../models/user');

router.get('/signup', function(req, res, next) {
    res.render('accounts/signup', {
        errors: req.flash('errors')
    })
})

router.post('/signup', function(req,res) {
    const user = new User();

    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email; 
    
    // validation using mongoose method
    User.findOne({email: req.body.email}, function(error, existingUser) {
        if(existingUser) {
            req.flash('errors', 'Account with that email already exists')
            // console.log(req.body.email, ' already exists');
            return res.redirect('/signup');
        } else {
            user.save(function(error, user) {
                if (error) return next(error);
                return res.redirect('/profile');
                // res.json('New user has been successfully created.')
            });
        }
    });
});

module.exports = router;