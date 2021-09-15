const routes = (handler) => [
    {
        method: 'POST',
        path: '/songs',
        handler: handler.postSongHandler, // hanya menyimpan satu lagu
        options: {
            auth: 'musicapp_jwt',
        },
    },
    {
        method: 'GET',
        path: '/songs',
        handler: handler.getSongsHandler, // mengembalikan banyak lagu
        options: {
            auth: 'musicapp_jwt',
        },
    },
    {
        method: 'GET',
        path: '/songs/{id}',
        handler: handler.getSongByIdHandler,
        options: {
            auth: 'musicapp_jwt',
        },
    },
    {
        method: 'PUT',
        path: '/songs/{id}',
        handler: handler.putSongByIdHandler,
        options: {
            auth: 'musicapp_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/songs/{id}',
        handler: handler.deleteSongByIdHandler,
        options: {
            auth: 'musicapp_jwt',
        },
    },
];

module.exports = routes;