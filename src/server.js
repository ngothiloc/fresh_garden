const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes/index');
const authRoutes = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');

const app = express();

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views'));

// Static Files Setup
app.use('/assets', express.static(path.join(__dirname, '../src/assets')));
app.use('/dashboard/assets', express.static(path.join(__dirname, '../src/assets')));
app.use(express.static(path.join(__dirname, '../public')));

// Middleware for Request Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session Configuration
// app.use(session({
//     secret: 'mysecret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Use `true` with HTTPS
// }));

// Route Setup
app.use('/dashboard', dashboardRouter);
app.use('/auth', authRoutes);
app.use('/', routes);

// 404 Error Handler
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));