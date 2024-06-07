const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
const uri = 'mongodb+srv://bhoomikaumesh2105:vCvDEuEnIwEVvWoN@guestbook-db.ypg6vvd.mongodb.net/?retryWrites=true&w=majority&appName=guestbook-db';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
const guestbookRoutes = require('./routes/guestbook');
app.use('/api', guestbookRoutes);

// Serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

//mongodb+srv://bhoomikaumesh2105:<password>@guestbook-db.jcu7kxr.mongodb.net/?retryWrites=true&w=majority&appName=guestbook-db