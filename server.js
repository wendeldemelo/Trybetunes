const path = require('path');

const express = require('express');

const app = express();

const serverPort = 3000;

const port = process.env.PORT || serverPort;
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.js'));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});