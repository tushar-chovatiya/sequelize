const express = require("express");
const cors = require("cors");
const routes = require('./routes/routes');
let bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

app.listen(8001, () => {
  console.log(`Server is running on port 8001.`);
});