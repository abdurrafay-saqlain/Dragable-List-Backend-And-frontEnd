const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
    const users = [
        { id: 1, name: 'Leanne Graham' },
        { id: 2, name: 'Ervin Howell' },
        { id: 3, name: 'Rafay' },
        { id: 4, name: 'Shayan' },
        { id: 5, name: 'Sunaim' },
        { id: 6, name: 'Abdullah' },
        { id: 7, name: 'Ali khan' },
    ];
    res.json(users);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
