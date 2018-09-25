var express = require('express');
var User = require('../models/User');
const router = express.Router();

router.post('/', (req, res) => {
    const { credentials } = req.body;
    User.findOne({ email: credentials.email }).then(user => {
        if (user) {

        } else {
            res.status(400).json({errors: {global: 'Invalid credentials'}});
        }
    })
})

module.exports = router;
