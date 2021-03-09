
const srv = require('./srv.js')
const config = require('./config')
const { test, login, workouts } = require('./requestHandlers');

const server = srv.configure();

server.get('/login', (req, res) => login.login(req, res));
server.get('/loginSuccess', (req, res) => login.success(req, res));
server.get('/workouts/all', async (req, res) => await workouts.all(req, res));
server.get('/test', (req, res) => test.test(req, res));
server.post('/test', (req, res) => test.test(req, res));

srv.start(server, config.PORT);

