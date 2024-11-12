const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('main get/');
    res.send(true);
});

module.exports = router;