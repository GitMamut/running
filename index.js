const log = require('./log.js');
const srv = require('./srv.js')
const config = require('./config')
const { test, login, workouts, lametric } = require('./requestHandlers');

log.startup();

const server = srv.configure();

server.get(config.PREFIX + '/login', (req, res) => login.login(req, res));
server.get(config.PREFIX + '/loginSuccess', (req, res) => login.success(req, res));
server.get(config.PREFIX + '/lametric/all', async (req, res) => await lametric.all(req, res));
server.get(config.PREFIX + '/workouts/fetchNew', async (req, res) => await workouts.fetchNew(req, res));
server.get(config.PREFIX + '/test', (req, res) => test.test(req, res));
server.post(config.PREFIX + '/test', (req, res) => test.test(req, res));

srv.start(server, config.PORT);

