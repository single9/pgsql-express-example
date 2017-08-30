const debug = require('debug')('app:server');
const session = require('cookie-session');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const config = require(CONFIG_FILE_PATH);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  debug('Server Started. *:%o', PORT);
});

// Views setting
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// cookie-session
app.set('trust proxy', 1); // trust first proxy

app.use(session(config.cookies));

// MaxAge
app.use(function SessionMaxAgeMiddleware (req, res, next) {
  req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge;
  next();
});

// locals.
app.use(function LocalsMiddleware (req, res, next) {

  res.locals.edit = false;
  res.locals.user = req.session.user || false;

  next();
});

const index = require('./routes/index.js');
const user = require('./routes/user.js');

app.use('/', index);
app.use('/user', user);

// Error Middleware
app.use(require('./libs/error.js'));