const express = require('express');
const bodyParser = require('body-parser');
const billRoutes = require('./routers/claimRouter'); 
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the billing API');
});

app.use('/api/bills', billRoutes);

app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).json({
        error: {
            message: error.message || 'Internal Server Error'
        }
    });
});

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});