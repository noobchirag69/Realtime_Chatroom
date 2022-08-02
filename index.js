const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'views')))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
});