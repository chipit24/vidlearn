var Hapi = require('hapi');
var path = require('path');

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'dist')
      }
    }
  }
});

server.connection({
  host: 'localhost',
  address: '0.0.0.0',
  port: 3001
});

server.register(require('inert'), (err) => {
  if (err) throw err;
  /* Routes are handled from most-specific to least specific */
  
  /* Favicon */
  server.route({
    method: 'GET',
    path:'/favicon.ico',
    handler: function (request, reply) {
      var file = './favicon.ico';
      console.log(file);
      reply.file(file);
    }
  });
  
  /* Serving images */
  server.route({
    method: 'GET',
    path:'/img/{imageFile}',
    handler: function (request, reply) {
      var file = `./img/${request.params.imageFile}`;
      console.log(file);
      reply.file(file);
    }
  });
  
  /* Serving css files */
  server.route({
    method: 'GET',
    path:'/css/{cssFile}.css',
    handler: function (request, reply) {
      var file = `./css/${request.params.cssFile}.css`;
      console.log(file);
      reply.file(file);
    }
  });

  /* Serving js source maps */
  server.route({
    method: 'GET',
    path:'/js/{jsFile}.js.map',
    handler: function (request, reply) {
      var file = `./js/${request.params.jsFile}.js.map`;
      console.log(file);
      reply.file(file);
    }
  });

  /* Serving static js files */
  server.route({
    method: 'GET',
    path:'/js/{jsFile}.js',
    handler: function (request, reply) {
      var file = `./js/${request.params.jsFile}.js`;
      console.log(file);
      reply.file(file);
    }
  });

  /* Catch-all route that will return our React SPA */
  server.route({
    method: 'GET',
    path:'/{path*}',
    handler: function (request, reply) {
      var file = './index.html';
      console.log(`${request.params.path || '/'}\n\t>> ${file}\n`);
      reply.file(file);
    }
  });

  /* Start the server */
  server.start((err) => {
    if (err) throw err;
    console.log('Server running at:', server.info.uri);
  });
});