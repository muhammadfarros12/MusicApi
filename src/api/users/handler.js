const ClientError = require('../../exceptions/ClientError');

class UsersHandler{
    constructor(service, validator){
        this._service = service;
        this._validator = validator;

        this.postUserHandler = this.postUserHandler.bind(this);
        this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
    }

    async postUserHandler(request, h){
        try {
            this._validator.validateUserPayload(request.payload);
            const { username, password, fullname } = request.payload;

            const userId = await this._service.addUser({ username, password, fullname });

            const response = h.response({
                status: 'success',
                message: 'User Berhasil ditambahkan',
                data: {
                    userId
                }
            });
            return response.code(201);
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                return response.code(error.statusCode);
            }

            // server Error
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;

        }
    }

    async getUserByIdHandler(request, h){
        try {
            const { id } = request.params;
            const user = await this._service.getUserById(id);

            return {
                status: 'success',
                data: {
                    user,
                }
            }

        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message
                });
                return response.code(error.statusCode);
            }

            // server Error
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

module.exports = UsersHandler;