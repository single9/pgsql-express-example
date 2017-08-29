module.exports = {
  database: {
    user: undefined,
    host: 'localhost',
    database: undefined,
    password: undefined,
    ssl: true,
    port: 5432,
  },
  cookies: {
    secret: 'qwekksadqwe',
    name: 'session',
    keys: [randoms(), randoms()],
    resave: true,
    saveUninitialized: true,
    maxAge: 60 * 60 * 24 * 30 * 1000 // 30 days
  },
  secret: 'sEcReT'
}

function randoms () {
  let num = (Math.random() * 5000).toString();
  let base64 = new Buffer(num).toString('base64');
  return base64;
}