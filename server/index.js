const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require("./src/routes/calculate");

const app = express();
const apiPort = 5001;

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());


app.post("/", (req, res) => {
    res.json({'message': 'ok'});
});

app.use('/api', router);


app.listen(apiPort, () => {})

