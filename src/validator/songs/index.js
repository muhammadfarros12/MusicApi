const InvariantError = require("../../exceptions/InvariantError");
const { SongsPayloadSchema } = require("./schema")

const SongsValidator = {
    validateSongPayload: (payload) => {
        const validationResult = SongsPayloadSchema.validate(payload);
        if (validationResult.error) {
            // ganti Error biasa dengan custom Error
            throw new InvariantError(validationResult.error.message);
        }
    }
}

module.exports = SongsValidator;