
const srv = require('./srv.js')
const config = require('./config')
const { test, login, workouts } = require('./requestHandlers');

const server = srv.configure();

server.get(config.PREFIX + '/login', (req, res) => login.login(req, res));
server.get(config.PREFIX + '/loginSuccess', (req, res) => login.success(req, res));
server.get(config.PREFIX + '/workouts/all', async (req, res) => await workouts.all(req, res));
server.get(config.PREFIX + '/test', (req, res) => test.test(req, res));
server.post(config.PREFIX + '/test', (req, res) => test.test(req, res));

srv.start(server, config.PORT);

