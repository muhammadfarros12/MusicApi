// import dotenv untuk import dan menjalankan konfigurasinya
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const songs = require('./api/songs');
const SongsService = require('./services/postgres/SongsService');
// untuk validator
const SongsValidator = require('./validator/songs');

const init = async () => {
  const songsService = new SongsService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  // tidak digunakan
  //server.route(routes);

  await server.register({
    plugin: songs,
    options: {
      service: songsService,
      // validator
      validator: SongsValidator,
    }
  })

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
