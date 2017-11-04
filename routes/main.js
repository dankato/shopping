const router = require('express').Router();


router.get('/', function(req, res) {
    res.render('main/home');
})

router.get('/about', function(req, res) {
    res.render('main/about');
})


router.put('/', function(req,res) {
    
});

router.delete('/', function(req, res) {
    
});

module.exports = router;