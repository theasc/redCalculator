const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

const {calculate} = require("../services/calculationService");

router.post('/calculate', body('stack').isArray(), async ({body: {stack}}, res) => {
    res.json(await calculate(stack));
})

module.exports = router;
