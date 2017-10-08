const restify = require('restify');
const server = restify.createServer();
const data = require('../handlers.js');
server.use(restify.plugins.bodyParser());

server.get('/', restify.plugins.serveStatic({
    'directory':__dirname.replace('/service', '/frontend/public'),
    'default': 'index.html'
})
)
server.post('/handlers', data.pulldown)

server.listen(8080)