const ClientError = require('../../exceptions/ClientError')

class SongsHandler {
    // menambahkan validator ke postSongHandler dan putSongByIdhandler
    constructor(service, validator){
        this._service = service;
        this._validator = validator;

        this.postSongHandler = this.postSongHandler.bind(this);
        this.getSongsHandler = this.getSongsHandler.bind(this);
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
        this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);

    }

    async postSongHandler(request, h) {
        try {
            // validasi data
            this._validator.validateSongPayload(request.payload);
            const { title, year, performer, genre, duration } = request.payload;

            const songId = await this._service.addSong({
                title, year, performer, genre, duration
            });

        const response = h.response({
            status: 'success',
            message: 'Lagu berhasil ditambahkan',
            data: {
                songId,
            },
        });
        response.code(201);
        return response;
        } catch (error) {
            // setelah custom error kita menambahkan proses evaluasi object error
            if (error instanceof ClientError) {
            const response = h.response({
            status: 'fail',
            message: error.message,
            });
            response.code(error.statusCode);
            return response;
        }

            // Server Error
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
            
        }
        
    }

    async getSongsHandler() {
        // call get songs service
        const songs = await this._service.getSongs();
    
        const smallSongs = songs.map(({ id, title, performer }) => ({
            id,
            title,
            performer,
        }));

        return {
            status: 'success',
            data: {
            songs: smallSongs,
        },
        };
    }

    async getSongByIdHandler(request, h){
        try {
            const { id } = request.params;
            const song = await this._service.getSongById(id);
            return {
            status: 'success',
            data: {
                song,
            },
        };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                status: 'fail',
                message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

              // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
        
    }

    async putSongByIdHandler(request, h){
        try {
            this._validator.validateSongPayload(request.payload);
            const{ id } = request.params;

        await this._service.editSongById(id, request.payload);

        return{
            status: 'success',
            message: 'Catatan berhasil diperbarui'
        };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                status: 'fail',
                message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
    
              // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
        
    }

    async deleteSongByIdHandler(request, h){
        try {
            const { id } = request.params;
        await this._service.deleteNoteById(id);
        return{
            status: 'success',
            message: 'Catatan berhasil diperbarui'
        };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }
        
              // Server ERROR!
                const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
        
    }
}

module.exports = SongsHandler;