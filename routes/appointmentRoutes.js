const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('appointment get/', req.user);
    res.send(true);
});

module.exports = router;